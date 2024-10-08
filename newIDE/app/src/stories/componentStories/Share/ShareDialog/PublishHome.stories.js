// @flow
import * as React from 'react';
import { action } from '@storybook/addon-actions';
import paperDecorator from '../../../PaperDecorator';
import { type Exporter } from '../../../../ExportAndShare/ShareDialog';

import {
  type ExporterSection,
  type ExporterSubSection,
} from '../../../../ExportAndShare/ShareDialog';
import PublishHome from '../../../../ExportAndShare/ShareDialog/PublishHome';
import GDevelopJsInitializerDecorator, {
  testProject,
} from '../../../GDevelopJsInitializerDecorator';
import { fakeBrowserOnlineWebExportPipeline } from '../../../../fixtures/TestExporters';
import AuthenticatedUserContext from '../../../../Profile/AuthenticatedUserContext';
import { fakeStartupAuthenticatedUser } from '../../../../fixtures/GDevelopServicesTestData';
import {
  fakeEmptyGameAndBuildsManager,
  fakeNotOwnedGameAndBuildsManager,
} from '../../../../fixtures/GDevelopServicesTestData/FakeGameAndBuildsManager';

export default {
  title: 'Share/PublishHome',
  component: PublishHome,
  decorators: [paperDecorator, GDevelopJsInitializerDecorator],
};

const onlineWebExporter: Exporter = {
  key: 'onlinewebexport',
  tabName: 'Web',
  name: 'Web',
  helpPage: '/publishing/web',
  exportPipeline: fakeBrowserOnlineWebExportPipeline,
};

export const Default = () => {
  const [
    chosenExporterSection,
    setChosenExporterSection,
  ] = React.useState<?ExporterSection>(null);
  const [
    chosenExporterSubSection,
    setChosenExporterSubSection,
  ] = React.useState<?ExporterSubSection>(null);
  return (
    <PublishHome
      project={testProject.project}
      onSaveProject={action('onSaveProject')}
      isSavingProject={false}
      gameAndBuildsManager={fakeEmptyGameAndBuildsManager}
      onChangeSubscription={action('onChangeSubscription')}
      isNavigationDisabled={false}
      setIsNavigationDisabled={action('setIsNavigationDisabled')}
      selectedExporter={null}
      onChooseSection={setChosenExporterSection}
      onChooseSubSection={setChosenExporterSubSection}
      chosenSection={chosenExporterSection}
      chosenSubSection={chosenExporterSubSection}
    />
  );
};

export const OnlineWebExporterSelected = () => {
  const [
    chosenExporterSection,
    setChosenExporterSection,
  ] = React.useState<?ExporterSection>('browser');
  const [
    chosenExporterSubSection,
    setChosenExporterSubSection,
  ] = React.useState<?ExporterSubSection>('online');
  return (
    <AuthenticatedUserContext.Provider value={fakeStartupAuthenticatedUser}>
      <PublishHome
        project={testProject.project}
        onSaveProject={action('onSaveProject')}
        isSavingProject={false}
        gameAndBuildsManager={fakeEmptyGameAndBuildsManager}
        onChangeSubscription={action('onChangeSubscription')}
        isNavigationDisabled={false}
        setIsNavigationDisabled={action('setIsNavigationDisabled')}
        selectedExporter={onlineWebExporter}
        onChooseSection={setChosenExporterSection}
        onChooseSubSection={setChosenExporterSubSection}
        chosenSection={chosenExporterSection}
        chosenSubSection={chosenExporterSubSection}
      />
    </AuthenticatedUserContext.Provider>
  );
};

export const OnlineWebExporterSelectedForGameNotOwned = () => {
  const [
    chosenExporterSection,
    setChosenExporterSection,
  ] = React.useState<?ExporterSection>('browser');
  const [
    chosenExporterSubSection,
    setChosenExporterSubSection,
  ] = React.useState<?ExporterSubSection>('online');
  return (
    <AuthenticatedUserContext.Provider value={fakeStartupAuthenticatedUser}>
      <PublishHome
        project={testProject.project}
        onSaveProject={action('onSaveProject')}
        isSavingProject={false}
        gameAndBuildsManager={fakeNotOwnedGameAndBuildsManager}
        onChangeSubscription={action('onChangeSubscription')}
        isNavigationDisabled={false}
        setIsNavigationDisabled={action('setIsNavigationDisabled')}
        selectedExporter={onlineWebExporter}
        onChooseSection={setChosenExporterSection}
        onChooseSubSection={setChosenExporterSubSection}
        chosenSection={chosenExporterSection}
        chosenSubSection={chosenExporterSubSection}
      />
    </AuthenticatedUserContext.Provider>
  );
};

export const OnlyOnlineWebExporter = () => {
  const [
    chosenExporterSection,
    setChosenExporterSection,
  ] = React.useState<?ExporterSection>('browser');
  const [
    chosenExporterSubSection,
    setChosenExporterSubSection,
  ] = React.useState<?ExporterSubSection>('online');
  return (
    <AuthenticatedUserContext.Provider value={fakeStartupAuthenticatedUser}>
      <PublishHome
        project={testProject.project}
        onSaveProject={action('onSaveProject')}
        isSavingProject={false}
        gameAndBuildsManager={fakeEmptyGameAndBuildsManager}
        onChangeSubscription={action('onChangeSubscription')}
        isNavigationDisabled={false}
        setIsNavigationDisabled={action('setIsNavigationDisabled')}
        selectedExporter={onlineWebExporter}
        onChooseSection={setChosenExporterSection}
        onChooseSubSection={setChosenExporterSubSection}
        chosenSection={chosenExporterSection}
        chosenSubSection={chosenExporterSubSection}
        showOnlineWebExporterOnly
      />
    </AuthenticatedUserContext.Provider>
  );
};
