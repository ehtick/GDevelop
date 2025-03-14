// Generated by dts-bundle-generator v5.9.0
declare namespace PIXI {
  namespace particles {
    export interface EmitterConfigV3 {
      lifetime: RandNumber;
      ease?: SimpleEase | EaseSegment[];
      particlesPerWave?: number;
      frequency: number;
      spawnChance?: number;
      emitterLifetime?: number;
      maxParticles?: number;
      addAtBack?: boolean;
      pos: {
        x: number;
        y: number;
      };
      emit?: boolean;
      autoUpdate?: boolean;
      behaviors: {
        type: string;
        config: any;
      }[];
    }
    export interface RandNumber {
      max: number;
      min: number;
    }
    export function upgradeConfig(
      config: EmitterConfigV2 | EmitterConfigV1,
      art: any
    ): EmitterConfigV3;
    export interface EmitterConfigV2 {
      alpha?: ValueList<number>;
      speed?: ValueList<number>;
      minimumSpeedMultiplier?: number;
      maxSpeed?: number;
      acceleration?: {
        x: number;
        y: number;
      };
      scale?: ValueList<number>;
      minimumScaleMultiplier?: number;
      color?: ValueList<string>;
      startRotation?: RandNumber;
      noRotation?: boolean;
      rotationSpeed?: RandNumber;
      rotationAcceleration?: number;
      lifetime: RandNumber;
      blendMode?: string;
      ease?: SimpleEase | EaseSegment[];
      extraData?: any;
      particlesPerWave?: number;
      /**
       * Really "rect"|"circle"|"ring"|"burst"|"point"|"polygonalChain", but that
       * tends to be too strict for random object creation.
       */
      spawnType?: string;
      spawnRect?: {
        x: number;
        y: number;
        w: number;
        h: number;
      };
      spawnCircle?: {
        x: number;
        y: number;
        r: number;
        minR?: number;
      };
      particleSpacing?: number;
      angleStart?: number;
      spawnPolygon?: PIXI.IPointData[] | PIXI.IPointData[][];
      frequency: number;
      spawnChance?: number;
      emitterLifetime?: number;
      maxParticles?: number;
      addAtBack?: boolean;
      pos: {
        x: number;
        y: number;
      };
      emit?: boolean;
      autoUpdate?: boolean;
      orderedArt?: boolean;
    }
    export interface BasicTweenable<T> {
      start: T;
      end: T;
    }
    export interface EmitterConfigV1 {
      alpha?: BasicTweenable<number>;
      speed?: BasicTweenable<number> & {
        minimumSpeedMultiplier?: number;
      };
      maxSpeed?: number;
      acceleration?: {
        x: number;
        y: number;
      };
      scale?: BasicTweenable<number> & {
        minimumScaleMultiplier?: number;
      };
      color?: BasicTweenable<string>;
      startRotation?: RandNumber;
      noRotation?: boolean;
      rotationSpeed?: RandNumber;
      rotationAcceleration?: number;
      lifetime: RandNumber;
      blendMode?: string;
      ease?: SimpleEase | EaseSegment[];
      extraData?: any;
      particlesPerWave?: number;
      /**
       * Really "rect"|"circle"|"ring"|"burst"|"point"|"polygonalChain", but that
       * tends to be too strict for random object creation.
       */
      spawnType?: string;
      spawnRect?: {
        x: number;
        y: number;
        w: number;
        h: number;
      };
      spawnCircle?: {
        x: number;
        y: number;
        r: number;
        minR?: number;
      };
      particleSpacing?: number;
      angleStart?: number;
      spawnPolygon?: PIXI.IPointData[] | PIXI.IPointData[][];
      frequency: number;
      spawnChance?: number;
      emitterLifetime?: number;
      maxParticles?: number;
      addAtBack?: boolean;
      pos: {
        x: number;
        y: number;
      };
      emit?: boolean;
      autoUpdate?: boolean;
      orderedArt?: boolean;
    }
    export interface ValueStep<T> {
      value: T;
      time: number;
    }
    export interface ValueList<T> {
      list: ValueStep<T>[];
      isStepped?: boolean;
      ease?: SimpleEase | EaseSegment[];
    }
    /**
     * A single node in a PropertyList.
     */
    export class PropertyNode<V> {
      /**
       * Value for the node.
       */
      value: V;
      /**
       * Time value for the node. Between 0-1.
       */
      time: number;
      /**
       * The next node in line.
       */
      next: PropertyNode<V>;
      /**
       * If this is the first node in the list, controls if the entire list is stepped or not.
       */
      isStepped: boolean;
      ease: SimpleEase;
      /**
       * @param value The value for this node
       * @param time The time for this node, between 0-1
       * @param [ease] Custom ease for this list. Only relevant for the first node.
       */
      constructor(value: V, time: number, ease?: SimpleEase | EaseSegment[]);
      /**
       * Creates a list of property values from a data object {list, isStepped} with a list of objects in
       * the form {value, time}. Alternatively, the data object can be in the deprecated form of
       * {start, end}.
       * @param data The data for the list.
       * @param data.list The array of value and time objects.
       * @param data.isStepped If the list is stepped rather than interpolated.
       * @param data.ease Custom ease for this list.
       * @return The first node in the list
       */
      static createList<T extends string | number>(
        data: ValueList<T> | BasicTweenable<T>
      ): PropertyNode<T extends string ? Color : T>;
    }
    export function GetTextureFromString(s: string): PIXI.Texture;
    export interface Color {
      r: number;
      g: number;
      b: number;
      a?: number;
    }
    export interface EaseSegment {
      cp: number;
      s: number;
      e: number;
    }
    export type SimpleEase = (time: number) => number;
    /**
     * Contains helper functions for particles and emitters to use.
     */
    export namespace ParticleUtils {
      /**
       * If errors and warnings should be logged within the library.
       */
      const verbose = false;
      const DEG_TO_RADS: number;
      /**
       * Rotates a point by a given angle.
       * @param angle The angle to rotate by in radians
       * @param p The point to rotate around 0,0.
       */
      function rotatePoint(angle: number, p: PIXI.IPointData): void;
      /**
       * Combines separate color components (0-255) into a single uint color.
       * @param r The red value of the color
       * @param g The green value of the color
       * @param b The blue value of the color
       * @return The color in the form of 0xRRGGBB
       */
      function combineRGBComponents(r: number, g: number, b: number): number;
      /**
       * Reduces the point to a length of 1.
       * @param point The point to normalize
       */
      function normalize(point: PIXI.IPointData): void;
      /**
       * Multiplies the x and y values of this point by a value.
       * @param point The point to scaleBy
       * @param value The value to scale by.
       */
      function scaleBy(point: PIXI.IPointData, value: number): void;
      /**
       * Returns the length (or magnitude) of this point.
       * @param point The point to measure length
       * @return The length of this point.
       */
      function length(point: PIXI.IPointData): number;
      /**
       * Converts a hex string from "#AARRGGBB", "#RRGGBB", "0xAARRGGBB", "0xRRGGBB",
       * "AARRGGBB", or "RRGGBB" to an object of ints of 0-255, as
       * {r, g, b, (a)}.
       * @param color The input color string.
       * @param output An object to put the output in. If omitted, a new object is created.
       * @return The object with r, g, and b properties, possibly with an a property.
       */
      function hexToRGB(color: string, output?: Color): Color;
      /**
       * Generates a custom ease function, based on the GreenSock custom ease, as demonstrated
       * by the related tool at http://www.greensock.com/customease/.
       * @param segments An array of segments, as created by
       * http://www.greensock.com/customease/.
       * @return A function that calculates the percentage of change at
       *                    a given point in time (0-1 inclusive).
       */
      function generateEase(segments: EaseSegment[]): SimpleEase;
      /**
       * Gets a blend mode, ensuring that it is valid.
       * @param name The name of the blend mode to get.
       * @return The blend mode as specified in the PIXI.BLEND_MODES enumeration.
       */
      function getBlendMode(name: string): number;
      /**
       * Converts a list of {value, time} objects starting at time 0 and ending at time 1 into an evenly
       * spaced stepped list of PropertyNodes for color values. This is primarily to handle conversion of
       * linear gradients to fewer colors, allowing for some optimization for Canvas2d fallbacks.
       * @param list The list of data to convert.
       * @param [numSteps=10] The number of steps to use.
       * @return The blend mode as specified in the PIXI.blendModes enumeration.
       */
      function createSteppedGradient(
        list: ValueStep<string>[],
        numSteps?: number
      ): PropertyNode<Color>;
    }
    export interface IEmitterBehavior {
      order: number;
      initParticles(first: Particle): void;
      updateParticle?(particle: Particle, deltaSec: number): void | boolean;
      recycleParticle?(particle: Particle, natural: boolean): void;
    }
    export interface IEmitterBehaviorClass {
      type: string;
      new (config: any): IEmitterBehavior;
    }
    const PositionParticle: unique symbol;
    /**
     * A particle emitter.
     */
    export class Emitter {
      private static knownBehaviors;
      static registerBehavior(constructor: IEmitterBehaviorClass): void;
      /**
       * Active initialization behaviors for this emitter.
       */
      protected initBehaviors: (IEmitterBehavior | typeof PositionParticle)[];
      /**
       * Active update behaviors for this emitter.
       */
      protected updateBehaviors: IEmitterBehavior[];
      /**
       * Active recycle behaviors for this emitter.
       */
      protected recycleBehaviors: IEmitterBehavior[];
      /**
       * The minimum lifetime for a particle, in seconds.
       */
      minLifetime: number;
      /**
       * The maximum lifetime for a particle, in seconds.
       */
      maxLifetime: number;
      /**
       * An easing function for nonlinear interpolation of values. Accepts a single
       * parameter of time as a value from 0-1, inclusive. Expected outputs are values
       * from 0-1, inclusive.
       */
      customEase: SimpleEase;
      /**
       * Time between particle spawns in seconds.
       */
      protected _frequency: number;
      /**
       * Chance that a particle will be spawned on each opportunity to spawn one.
       * 0 is 0%, 1 is 100%.
       */
      spawnChance: number;
      /**
       * Maximum number of particles to keep alive at a time. If this limit
       * is reached, no more particles will spawn until some have died.
       */
      maxParticles: number;
      /**
       * The amount of time in seconds to emit for before setting emit to false.
       * A value of -1 is an unlimited amount of time.
       */
      emitterLifetime: number;
      /**
       * Position at which to spawn particles, relative to the emitter's owner's origin.
       * For example, the flames of a rocket travelling right might have a spawnPos
       * of {x:-50, y:0}.
       * to spawn at the rear of the rocket.
       * To change this, use updateSpawnPos().
       */
      spawnPos: PIXI.Point;
      /**
       * Number of particles to spawn time that the frequency allows for particles to spawn.
       */
      particlesPerWave: number;
      /**
       * Rotation of the emitter or emitter's owner in degrees. This is added to
       * the calculated spawn angle.
       * To change this, use rotate().
       */
      protected rotation: number;
      /**
       * The world position of the emitter's owner, to add spawnPos to when
       * spawning particles. To change this, use updateOwnerPos().
       */
      protected ownerPos: PIXI.Point;
      /**
       * The origin + spawnPos in the previous update, so that the spawn position
       * can be interpolated to space out particles better.
       */
      protected _prevEmitterPos: PIXI.Point;
      /**
       * If _prevEmitterPos is valid, to prevent interpolation on the first update
       */
      protected _prevPosIsValid: boolean;
      /**
       * If either ownerPos or spawnPos has changed since the previous update.
       */
      protected _posChanged: boolean;
      /**
       * The container to add particles to.
       */
      protected _parent: PIXI.Container;
      /**
       * If particles should be added at the back of the display list instead of the front.
       */
      addAtBack: boolean;
      /**
       * The current number of active particles.
       */
      particleCount: number;
      /**
       * If particles should be emitted during update() calls. Setting this to false
       * stops new particles from being created, but allows existing ones to die out.
       */
      protected _emit: boolean;
      /**
       * The timer for when to spawn particles in seconds, where numbers less
       * than 0 mean that particles should be spawned.
       */
      protected _spawnTimer: number;
      /**
       * The life of the emitter in seconds.
       */
      protected _emitterLife: number;
      /**
       * The particles that are active and on the display list. This is the first particle in a
       * linked list.
       */
      protected _activeParticlesFirst: Particle;
      /**
       * The particles that are active and on the display list. This is the last particle in a
       * linked list.
       */
      protected _activeParticlesLast: Particle;
      /**
       * The particles that are not currently being used. This is the first particle in a
       * linked list.
       */
      protected _poolFirst: Particle;
      /**
       * The original config object that this emitter was initialized with.
       */
      protected _origConfig: any;
      /**
       * If the update function is called automatically from the shared ticker.
       * Setting this to false requires calling the update function manually.
       */
      protected _autoUpdate: boolean;
      /**
       * If the emitter should destroy itself when all particles have died out. This is set by
       * playOnceAndDestroy();
       */
      protected _destroyWhenComplete: boolean;
      /**
       * A callback for when all particles have died out. This is set by
       * playOnceAndDestroy() or playOnce();
       */
      protected _completeCallback: () => void;
      /**
       * @param particleParent The container to add the particles to.
       * @param particleImages A texture or array of textures to use
       *                       for the particles. Strings will be turned
       *                       into textures via Texture.fromImage().
       * @param config A configuration object containing settings for the emitter.
       * @param config.emit If config.emit is explicitly passed as false, the
       *                    Emitter will start disabled.
       * @param config.autoUpdate If config.autoUpdate is explicitly passed as
       *                          true, the Emitter will automatically call
       *                          update via the PIXI shared ticker.
       */
      constructor(particleParent: PIXI.Container, config: EmitterConfigV3);
      /**
       * Time between particle spawns in seconds. If this value is not a number greater than 0,
       * it will be set to 1 (particle per second) to prevent infinite loops.
       */
      get frequency(): number;
      set frequency(value: number);
      /**
       * The container to add particles to. Settings this will dump any active particles.
       */
      get parent(): PIXI.Container;
      set parent(value: PIXI.Container);
      /**
       * Sets up the emitter based on the config settings.
       * @param config A configuration object containing settings for the emitter.
       */
      init(config: EmitterConfigV3): void;
      /**
       * Gets the instantiated behavior of the specified type, if any.
       * @param type The behavior type to find.
       */
      getBehavior(type: string): IEmitterBehavior | null;
      /**
       * Fills the pool with the specified number of particles, so that they don't have to be instantiated later.
       * @param count The number of particles to create.
       */
      fillPool(count: number): void;
      /**
       * Recycles an individual particle. For internal use only.
       * @param particle The particle to recycle.
       * @param fromCleanup If this is being called to manually clean up all particles.
       * @internal
       */
      recycle(particle: Particle, fromCleanup?: boolean): void;
      /**
       * Sets the rotation of the emitter to a new value. This rotates the spawn position in addition
       * to particle direction.
       * @param newRot The new rotation, in degrees.
       */
      rotate(newRot: number): void;
      /**
       * Changes the spawn position of the emitter.
       * @param x The new x value of the spawn position for the emitter.
       * @param y The new y value of the spawn position for the emitter.
       */
      updateSpawnPos(x: number, y: number): void;
      /**
       * Changes the position of the emitter's owner. You should call this if you are adding
       * particles to the world container that your emitter's owner is moving around in.
       * @param x The new x value of the emitter's owner.
       * @param y The new y value of the emitter's owner.
       */
      updateOwnerPos(x: number, y: number): void;
      /**
       * Prevents emitter position interpolation in the next update.
       * This should be used if you made a major position change of your emitter's owner
       * that was not normal movement.
       */
      resetPositionTracking(): void;
      /**
       * If particles should be emitted during update() calls. Setting this to false
       * stops new particles from being created, but allows existing ones to die out.
       */
      get emit(): boolean;
      set emit(value: boolean);
      /**
       * If the update function is called automatically from the shared ticker.
       * Setting this to false requires calling the update function manually.
       */
      get autoUpdate(): boolean;
      set autoUpdate(value: boolean);
      /**
       * Starts emitting particles, sets autoUpdate to true, and sets up the Emitter to destroy itself
       * when particle emission is complete.
       * @param callback Callback for when emission is complete (all particles have died off)
       */
      playOnceAndDestroy(callback?: () => void): void;
      /**
       * Starts emitting particles and optionally calls a callback when particle emission is complete.
       * @param callback Callback for when emission is complete (all particles have died off)
       */
      playOnce(callback?: () => void): void;
      /**
       * Updates all particles spawned by this emitter and emits new ones.
       * @param delta Time elapsed since the previous frame, in __seconds__.
       */
      update(delta: number): void;
      /**
       * Emits a single wave of particles, using standard spawnChance & particlesPerWave settings. Does not affect
       * regular spawning through the frequency, and ignores the emit property.
       */
      emitNow(): void;
      /**
       * Kills all active particles immediately.
       */
      cleanup(): void;
      /**
       * Destroys the emitter and all of its particles.
       */
      destroy(): void;
    }
    /** Interface for a child of a LinkedListContainer (has the prev/next properties added) */
    export interface LinkedListChild extends PIXI.DisplayObject {
      nextChild: LinkedListChild | null;
      prevChild: LinkedListChild | null;
    }
    /**
     * A semi-experimental Container that uses a doubly linked list to manage children instead of an
     * array. This means that adding/removing children often is not the same performance hit that
     * it would to be continually pushing/splicing.
     * However, this is primarily intended to be used for heavy particle usage, and may not handle
     * edge cases well if used as a complete Container replacement.
     */
    export class LinkedListContainer extends PIXI.Container {
      private _firstChild;
      private _lastChild;
      private _childCount;
      get firstChild(): LinkedListChild;
      get lastChild(): LinkedListChild;
      get childCount(): number;
      addChild<T extends PIXI.DisplayObject[]>(...children: T): T[0];
      addChildAt<T extends PIXI.DisplayObject>(child: T, index: number): T;
      /**
       * Adds a child to the container to be rendered below another child.
       *
       * @param child The child to add
       * @param relative - The current child to add the new child relative to.
       * @return The child that was added.
       */
      addChildBelow<T extends PIXI.DisplayObject>(
        child: T,
        relative: PIXI.DisplayObject
      ): T;
      /**
       * Adds a child to the container to be rendered above another child.
       *
       * @param child The child to add
       * @param relative - The current child to add the new child relative to.
       * @return The child that was added.
       */
      addChildAbove<T extends PIXI.DisplayObject>(
        child: T,
        relative: PIXI.DisplayObject
      ): T;
      swapChildren(child: PIXI.DisplayObject, child2: PIXI.DisplayObject): void;
      getChildIndex(child: PIXI.DisplayObject): number;
      setChildIndex(child: PIXI.DisplayObject, index: number): void;
      removeChild<T extends PIXI.DisplayObject[]>(...children: T): T[0];
      getChildAt(index: number): PIXI.DisplayObject;
      removeChildAt(index: number): PIXI.DisplayObject;
      removeChildren(
        beginIndex?: number,
        endIndex?: number
      ): PIXI.DisplayObject[];
      /**
       * Updates the transform on all children of this container for rendering.
       * Copied from and overrides PixiJS v5 method (v4 method is identical)
       */
      updateTransform(): void;
      /**
       * Recalculates the bounds of the container.
       * Copied from and overrides PixiJS v5 method (v4 method is identical)
       */
      calculateBounds(): void;
      /**
       * Retrieves the local bounds of the displayObject as a rectangle object. Copied from and overrides PixiJS v5 method
       */
      getLocalBounds(
        rect?: PIXI.Rectangle,
        skipChildrenUpdate?: boolean
      ): PIXI.Rectangle;
      /**
       * Renders the object using the WebGL renderer. Copied from and overrides PixiJS v5 method
       */
      render(renderer: PIXI.Renderer): void;
      /**
       * Render the object using the WebGL renderer and advanced features. Copied from and overrides PixiJS v5 method
       */
      protected renderAdvanced(renderer: PIXI.Renderer): void;
      /**
       * Renders the object using the Canvas renderer. Copied from and overrides PixiJS Canvas mixin in V5 and V6.
       */
      renderCanvas(renderer: any): void;
    }
    /**
     * An individual particle image. You shouldn't have to deal with these.
     */
    export class Particle
      extends PIXI.Sprite
      implements PIXI.particles.LinkedListChild
    {
      /**
       * The emitter that controls this particle.
       */
      emitter: Emitter;
      /**
       * The maximum lifetime of this particle, in seconds.
       */
      maxLife: number;
      /**
       * The current age of the particle, in seconds.
       */
      age: number;
      /**
       * The current age of the particle as a normalized value between 0 and 1.
       */
      agePercent: number;
      /**
       * One divided by the max life of the particle, saved for slightly faster math.
       */
      oneOverLife: number;
      /**
       * Reference to the next particle in the list.
       */
      next: Particle;
      /**
       * Reference to the previous particle in the list.
       */
      prev: Particle;
      prevChild: LinkedListChild;
      nextChild: LinkedListChild;
      /**
       * Static per-particle configuration for behaviors to use. Is not cleared when recycling.
       */
      config: {
        [key: string]: any;
      };
      protected Sprite_destroy: typeof PIXI.Sprite.prototype.destroy;
      /**
       * @param emitter The emitter that controls this particle.
       */
      constructor(emitter: Emitter);
      /**
       * Initializes the particle for use, based on the properties that have to
       * have been set already on the particle.
       */
      init(maxLife: number): void;
      /**
       * Kills the particle, removing it from the display list
       * and telling the emitter to recycle it.
       */
      kill(): void;
      /**
       * Destroys the particle, removing references and preventing future use.
       */
      destroy(): void;
    }
    /**
     * Singly linked list container for keeping track of interpolated properties for particles.
     * Each Particle will have one of these for each interpolated property.
     */
    export class PropertyList<V> {
      /**
       * The first property node in the linked list.
       */
      first: PropertyNode<V>;
      /**
       * Calculates the correct value for the current interpolation value. This method is set in
       * the reset() method.
       * @param lerp The interpolation value from 0-1.
       * @return The interpolated value. Colors are converted to the hex value.
       */
      interpolate: (lerp: number) => number;
      /**
       * A custom easing method for this list.
       * @param lerp The interpolation value from 0-1.
       * @return The eased value, also from 0-1.
       */
      ease: SimpleEase;
      /**
       * If this list manages colors, which requires a different method for interpolation.
       */
      private isColor;
      /**
       * @param isColor If this list handles color values
       */
      constructor(isColor?: boolean);
      /**
       * Resets the list for use.
       * @param first The first node in the list.
       * @param first.isStepped If the values should be stepped instead of interpolated linearly.
       */
      reset(first: PropertyNode<V>): void;
    }
  }
}
