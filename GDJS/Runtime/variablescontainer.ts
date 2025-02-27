/*
 * GDevelop JS Platform
 * Copyright 2013-2016 Florian Rival (Florian.Rival@gmail.com). All rights reserved.
 * This project is released under the MIT License.
 */
namespace gdjs {
  /**
   * VariablesContainer stores variables, usually for a a RuntimeGame, a RuntimeScene
   * or a RuntimeObject.
   */
  export class VariablesContainer {
    _variables: Hashtable<gdjs.Variable>;
    _variablesArray: gdjs.Variable[] = [];

    /**
     * @param [initialVariablesData] Optional array containing representations of the base variables.
     */
    constructor(initialVariablesData?: VariableData[]) {
      this._variables = new Hashtable();

      if (initialVariablesData !== undefined) {
        this.initFrom(initialVariablesData);
      }
    }

    /**
     * Initialize variables from a container data.<br>
     * If `keepOldVariables` is set to false (by default), all already existing variables will be
     * erased, but the new variables will be accessible thanks to getFromIndex. <br>
     * if `keepOldVariables` is set to true, already existing variables won't be erased and will be
     * still accessible thanks to getFromIndex.
     *
     * @param data The array containing data used to initialize variables.
     * @param [keepOldVariables] If set to true, already existing variables won't be erased.
     */
    initFrom(data: VariableData[], keepOldVariables?: Boolean) {
      if (keepOldVariables === undefined) {
        keepOldVariables = false;
      }
      if (!keepOldVariables) {
        VariablesContainer._deletedVars = VariablesContainer._deletedVars || [];
        // @ts-ignore
        this._variables.keys(VariablesContainer._deletedVars);
      }
      const that = this;
      let i = 0;
      for (let j = 0; j < data.length; ++j) {
        const varData = data[j];
        if (!varData.name) continue;

        //Get the variable:
        const variable = that.get(varData.name);
        variable.reinitialize(varData);
        if (!keepOldVariables) {
          //Register the variable in the extra array to ensure a fast lookup using getFromIndex.
          if (i < that._variablesArray.length) {
            that._variablesArray[i] = variable;
          } else {
            that._variablesArray.push(variable);
          }
          ++i;

          //Remove the variable from the list of variables to be deleted.
          const idx = VariablesContainer._deletedVars.indexOf(varData.name);
          if (idx !== -1) {
            VariablesContainer._deletedVars[idx] = undefined;
          }
        }
      }
      if (!keepOldVariables) {
        this._variablesArray.length = i;

        //If we do not want to keep the already existing variables,
        //remove all the variables not assigned above.
        //(Here, remove means flag the variable as not existing, to avoid garbage creation ).
        for (
          let i = 0, len = VariablesContainer._deletedVars.length;
          i < len;
          ++i
        ) {
          const variableName = VariablesContainer._deletedVars[i];
          if (variableName !== undefined) {
            this._variables.get(variableName).setUndefinedInContainer();
          }
        }
      }
    }

    rebuildIndexFrom(data: VariableData[]) {
      this._variablesArray.length = 0;
      for (const variableData of data) {
        if (variableData.name) {
          const variable = this._variables.get(variableData.name);
          this._variablesArray.push(variable);
        }
      }
    }

    /**
     * Declare a new variable.
     * This should only be used by generated code.
     *
     * @param name Variable name
     * @param newVariable The variable to be declared
     */
    _declare(name: string, newVariable: gdjs.Variable): void {
      this._variables.put(name, newVariable);
      this._variablesArray.push(newVariable);
    }

    /**
     * Add a new variable.
     * This can be costly, don't use in performance sensitive paths.
     *
     * @param name Variable name
     * @param newVariable The variable to be added
     */
    add(name: string, newVariable: gdjs.Variable) {
      const oldVariable = this._variables.get(name);

      // Variable is either already defined, considered as undefined
      // in the container or missing in the container.
      // Whatever the case, replace it by the new.
      this._variables.put(name, newVariable);
      if (oldVariable) {
        // If variable is indexed, ensure that the variable as the index
        // is replaced too. This can be costly (indexOf) but we assume `add` is not
        // used in performance sensitive code.
        const variableIndex = this._variablesArray.indexOf(oldVariable);
        if (variableIndex !== -1) {
          this._variablesArray[variableIndex] = newVariable;
        }
      }
    }

    /**
     * Remove a variable.
     * (the variable is not really removed from the container to avoid creating garbage, but marked as undefined)
     * @param name Variable to be removed
     */
    remove(name: string) {
      const variable = this._variables.get(name);
      if (variable) {
        variable.setUndefinedInContainer();
      }
    }

    /**
     * Get a variable.
     * @param name The variable's name
     * @return The specified variable. If not found, an empty variable is added to the container.
     */
    get(name: string): gdjs.Variable {
      let variable = this._variables.get(name);
      if (!variable) {
        //Add automatically non-existing variables.
        variable = new gdjs.Variable();
        this._variables.put(name, variable);
      } else {
        if (
          //Reuse variables removed before.
          variable.isUndefinedInContainer()
        ) {
          variable.reinitialize();
        }
      }
      return variable;
    }

    /**
     * Get a variable using its index. If you're unsure about how to use this method, prefer to use `get`.
     * The index of a variable is its index in the data passed to initFrom.
     *
     * This method is generally used by events generated code to increase lookup speed for variables.
     *
     * @param id The variable index
     * @return The specified variable. If not found, an empty variable is added to the container, but it
     * should not happen.
     */
    getFromIndex(id: number): gdjs.Variable {
      if (id >= this._variablesArray.length) {
        //Add automatically non-existing variables.
        let variable = new gdjs.Variable();
        this._variables.put('', variable);
        return variable;
      } else {
        let variable: gdjs.Variable = this._variablesArray[id];
        //Reuse variables removed before.
        if (variable.isUndefinedInContainer()) {
          variable.reinitialize();
        }
        return variable;
      }
    }

    /**
     * Check if a variable exists in the container.
     * @param name The variable's name
     * @return true if the variable exists.
     */
    has(name: string): boolean {
      const variable = this._variables.get(name);
      return !!variable && !variable.isUndefinedInContainer();
    }

    /**
     * Check if a variable exists in the container.
     * @param variable The variable
     * @return true if the variable exists.
     */
    hasVariable(variable: gdjs.Variable): boolean {
      const foundVariable = this._variablesArray.find((v) => v === variable);
      return !!foundVariable && !foundVariable.isUndefinedInContainer();
    }

    getVariableNameInContainerByLoopingThroughAllVariables(
      variable: gdjs.Variable
    ): string | null {
      const variableItems = this._variables.items;
      for (const variableName in variableItems) {
        if (variableItems.hasOwnProperty(variableName)) {
          if (variableItems[variableName] === variable) {
            return variableName;
          }
        }
      }

      return null;
    }

    static _deletedVars: Array<string | undefined> = [];

    getNetworkSyncData(
      syncOptions: GetNetworkSyncDataOptions
    ): VariableNetworkSyncData[] {
      const syncedPlayerNumber = syncOptions.playerNumber;
      const isHost = syncOptions.isHost;
      const networkSyncData: VariableNetworkSyncData[] = [];
      const variableNames = [];
      this._variables.keys(variableNames);
      variableNames.forEach((variableName) => {
        const variable = this._variables.get(variableName);
        const variableOwner = variable.getPlayerOwnership();
        if (
          // Variable undefined.
          variable.isUndefinedInContainer() ||
          // Variable marked as not to be synchronized.
          variableOwner === null ||
          // Getting sync data for a specific player:
          (syncedPlayerNumber !== undefined &&
            // Variable is owned by host but this player number is not the host.
            variableOwner === 0 &&
            !isHost) ||
          // Variable is owned by a player but not getting sync data for this player number.
          (variableOwner !== 0 && syncedPlayerNumber !== variableOwner)
        ) {
          // In those cases, the variable should not be synchronized.
          return;
        }

        const variableType = variable.getType();
        const variableValue =
          variableType === 'structure' || variableType === 'array'
            ? ''
            : variable.getValue();

        networkSyncData.push({
          name: variableName,
          value: variableValue,
          type: variableType,
          children: this.getStructureNetworkSyncData(variable),
          owner: variableOwner,
        });
      });

      return networkSyncData;
    }

    // Structure variables can contain other variables, so we need to recursively
    // get the sync data for each child variable.
    getStructureNetworkSyncData(
      variable: gdjs.Variable
    ): VariableNetworkSyncData[] | undefined {
      if (variable.getType() === 'array') {
        const allVariableNetworkSyncData: VariableNetworkSyncData[] = [];
        variable.getAllChildrenArray().forEach((childVariable) => {
          const childVariableType = childVariable.getType();
          const childVariableValue =
            childVariableType === 'structure' || childVariableType === 'array'
              ? ''
              : childVariable.getValue();

          const childVariableOwner = childVariable.getPlayerOwnership();
          if (
            // Variable undefined.
            childVariable.isUndefinedInContainer() ||
            // Variable marked as not to be synchronized.
            childVariableOwner === null
          ) {
            // In those cases, the variable should not be synchronized.
            return;
          }

          allVariableNetworkSyncData.push({
            name: '',
            value: childVariableValue,
            type: childVariableType,
            children: this.getStructureNetworkSyncData(childVariable),
            owner: childVariableOwner,
          });
        });

        return allVariableNetworkSyncData;
      }

      if (variable.getType() === 'structure') {
        const variableChildren = variable.getAllChildren();
        if (!variableChildren) return undefined;
        const allVariableNetworkSyncData: VariableNetworkSyncData[] = [];

        Object.entries(variableChildren).forEach(
          ([childVariableName, childVariable]) => {
            const childVariableType = childVariable.getType();
            const childVariableValue =
              childVariableType === 'structure' || childVariableType === 'array'
                ? ''
                : childVariable.getValue();
            const childVariableOwner = childVariable.getPlayerOwnership();
            if (
              // Variable undefined.
              childVariable.isUndefinedInContainer() ||
              // Variable marked as not to be synchronized.
              childVariableOwner === null
            ) {
              // In those cases, the variable should not be synchronized.
              return;
            }

            allVariableNetworkSyncData.push({
              name: childVariableName,
              value: childVariableValue,
              type: childVariableType,
              children: this.getStructureNetworkSyncData(childVariable),
              owner: childVariableOwner,
            });
          }
        );

        return allVariableNetworkSyncData;
      }

      return undefined;
    }

    updateFromNetworkSyncData(networkSyncData: VariableNetworkSyncData[]) {
      const that = this;
      for (let j = 0; j < networkSyncData.length; ++j) {
        const variableSyncData = networkSyncData[j];
        const variableData =
          that._getVariableDataFromNetworkSyncData(variableSyncData);
        const variableName = variableData.name;
        if (!variableName) continue;

        const variable = that.get(variableName);

        // // If we receive an update for this variable for a different owner than the one we know about,
        // then 2 cases:
        // - If we are the owner of the variable, then ignore the message, we assume it's a late update message or a wrong one,
        //   we are confident that we own this variable. (it may be reverted if we don't receive an acknowledgment in time)
        // - If we are not the owner of the variable, then assume that we missed the ownership change message, so update the variable's
        //   ownership and then update the variable.
        const syncedVariableOwner = variableSyncData.owner;
        const currentPlayerNumber = gdjs.multiplayer.getCurrentPlayerNumber();
        const currentVariableOwner = variable.getPlayerOwnership();
        if (currentPlayerNumber === currentVariableOwner) {
          console.info(
            `Variable ${variableName} is owned by us ${gdjs.multiplayer.playerNumber}, ignoring update message from ${syncedVariableOwner}.`
          );
          return;
        }

        if (syncedVariableOwner !== currentVariableOwner) {
          console.info(
            `Variable ${variableName} is owned by ${currentVariableOwner} on our game, changing ownership to ${syncedVariableOwner} as part of the update event.`
          );
          variable.setPlayerOwnership(syncedVariableOwner);
        }

        variable.reinitialize(variableData);
      }
    }

    _getVariableDataFromNetworkSyncData(
      syncData: VariableNetworkSyncData
    ): VariableData {
      return {
        name: syncData.name,
        value: syncData.value,
        type: syncData.type,
        children: syncData.children
          ? syncData.children.map((childSyncData) =>
              this._getVariableDataFromNetworkSyncData(childSyncData)
            )
          : undefined,
      };
    }

    /**
     * "Bad" variable container, used by events when no other valid container can be found.
     * This container has no state and always returns the bad variable ( see VariablesContainer.badVariable ).
     * @static
     */
    static badVariablesContainer: VariablesContainer = {
      _variables: new Hashtable(),
      _variablesArray: [],
      has: function () {
        return false;
      },
      getFromIndex: function () {
        return VariablesContainer.badVariable;
      },
      get: function () {
        return VariablesContainer.badVariable;
      },
      remove: function () {
        return;
      },
      add: function () {
        return;
      },
      _declare: function () {
        return;
      },
      initFrom: function () {
        return;
      },
      getNetworkSyncData: function () {
        return [];
      },
      updateFromNetworkSyncData: function () {
        return;
      },
      getStructureNetworkSyncData: function () {
        return undefined;
      },
      _getVariableDataFromNetworkSyncData: function () {
        return {};
      },
      hasVariable: function () {
        return false;
      },
      getVariableNameInContainerByLoopingThroughAllVariables: function () {
        return '';
      },
      rebuildIndexFrom: function () {
        return;
      },
    };

    /**
     * "Bad" variable, used by events when no other valid variable can be found.
     * This variable has no state and always return 0 or the empty string.
     * @static
     */
    static badVariable: Variable = {
      _type: 'number',
      _bool: false,
      _children: {},
      _childrenArray: [],
      _str: '',
      _undefinedInContainer: true,
      _value: 0,
      _playerNumber: 0,
      fromJSON: () => gdjs.VariablesContainer.badVariable,
      toJSObject: () => 0,
      fromJSObject: () => gdjs.VariablesContainer.badVariable,
      reinitialize: () => {},
      addChild: () => gdjs.VariablesContainer.badVariable,
      castTo: () => {},
      clearChildren: () => {},
      clone: () => gdjs.VariablesContainer.badVariable,
      getChildrenCount: () => 0,
      replaceChildren: () => {},
      replaceChildrenArray: () => {},
      getType: function () {
        return 'number';
      },
      isPrimitive: function () {
        return true;
      },
      setValue: () => {},
      toggle: () => {},
      getValue: () => 0,
      getChild: () => gdjs.VariablesContainer.badVariable,
      getChildAt: () => gdjs.VariablesContainer.badVariable,
      getChildNamed: () => gdjs.VariablesContainer.badVariable,
      hasChild: function () {
        return false;
      },
      isStructure: function () {
        return false;
      },
      isNumber: function () {
        return true;
      },
      removeChild: function () {
        return;
      },
      setNumber: function () {
        return;
      },
      setString: function () {
        return;
      },
      setBoolean: function () {
        return;
      },
      getAsString: function () {
        return '0';
      },
      getAsNumber: function () {
        return 0;
      },
      getAsNumberOrString: function () {
        return 0;
      },
      getAsBoolean: function () {
        return false;
      },
      getAllChildren: function () {
        return {};
      },
      getAllChildrenArray: function () {
        return [];
      },
      pushVariableCopy: () => {},
      _pushVariable: () => {},
      pushValue: () => {},
      removeAtIndex: function () {
        return;
      },
      add: function () {
        return;
      },
      sub: function () {
        return;
      },
      mul: function () {
        return;
      },
      div: function () {
        return;
      },
      concatenate: function () {
        return;
      },
      concatenateString: function () {
        return;
      },
      setUndefinedInContainer: function () {
        return;
      },
      isUndefinedInContainer: function () {
        return true;
      },
      getPlayerOwnership: function () {
        return 0;
      },
      setPlayerOwnership: function () {
        return;
      },
      disableSynchronization: function () {
        return;
      },
    };
  }
}
