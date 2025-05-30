// @flow
import * as React from 'react';
import { Trans } from '@lingui/macro';
import VariablesEditorDialog from './VariablesEditorDialog';
import { ProjectScopedContainersAccessor } from '../InstructionOrExpression/EventsScope';

type Props = {|
  open: boolean,
  project: gdProject,
  projectScopedContainersAccessor: ProjectScopedContainersAccessor,
  variablesContainer: gdVariablesContainer,
  onApply: (selectedVariableName: string | null) => void,
  onCancel: () => void,
  initiallySelectedVariableName: string,
  shouldCreateInitiallySelectedVariable?: boolean,
  isListLocked: boolean,
|};

const LocalVariablesDialog = ({
  project,
  projectScopedContainersAccessor,
  variablesContainer,
  open,
  onCancel,
  onApply,
  initiallySelectedVariableName,
  shouldCreateInitiallySelectedVariable,
  isListLocked,
}: Props) => {
  const tabs = React.useMemo(
    () => [
      {
        id: 'local-variables',
        label: '',
        variablesContainer,
        onComputeAllVariableNames: () => [],
      },
    ],
    [variablesContainer]
  );

  return (
    <VariablesEditorDialog
      project={project}
      projectScopedContainersAccessor={projectScopedContainersAccessor}
      open={open}
      onCancel={onCancel}
      onApply={onApply}
      title={<Trans>Local variables</Trans>}
      tabs={tabs}
      helpPagePath={'/all-features/variables/local-variables'}
      id="local-variables-dialog"
      initiallySelectedVariableName={initiallySelectedVariableName}
      shouldCreateInitiallySelectedVariable={
        shouldCreateInitiallySelectedVariable
      }
      hotReloadPreviewButtonProps={null}
      isListLocked={isListLocked}
    />
  );
};

export default LocalVariablesDialog;
