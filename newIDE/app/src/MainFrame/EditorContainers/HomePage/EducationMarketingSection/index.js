// @flow

import * as React from 'react';
import SectionContainer, { SectionRow } from '../SectionContainer';
import { Trans } from '@lingui/macro';
import Text from '../../../../UI/Text';
import { CardWidget } from '../CardWidget';
import {
  ColumnStackLayout,
  LineStackLayout,
  ResponsiveLineStackLayout,
} from '../../../../UI/Layout';
import RaisedButton from '../../../../UI/RaisedButton';
import { SubscriptionSuggestionContext } from '../../../../Profile/Subscription/SubscriptionSuggestionContext';
import Form from '../../../../UI/Form';
import TextField from '../../../../UI/TextField';
import { emailRegex } from '../../../../Profile/ForgotPasswordDialog';
import { Column, Line, Spacer } from '../../../../UI/Grid';
import { useResponsiveWindowSize } from '../../../../UI/Responsive/ResponsiveWindowMeasurer';
import type { EducationFormStatus, EducationForm } from '../UseEducationForm';
import PlaceholderLoader from '../../../../UI/PlaceholderLoader';
import FlatButton from '../../../../UI/FlatButton';
import PlaceholderError from '../../../../UI/PlaceholderError';
import ShinyCrown from '../../../../UI/CustomSvgIcons/ShinyCrown';
import Education from '../../../../Profile/Subscription/Icons/Education';
import Window from '../../../../Utils/Window';
import GDevelopThemeContext from '../../../../UI/Theme/GDevelopThemeContext';

const styles = {
  banner: {
    padding: 10,
    flex: 1,
    display: 'flex',
  },
  buttonContainer: {
    flexGrow: 1,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  },
  educationIcon: { width: 100, height: 100 },
  postersImage: { height: 260, aspectRatio: '1.15' },
  mobilePostersImage: { width: '100%' },
  rightPartContainer: { flex: 2, maxWidth: 500, display: 'flex' },
  mobileFooter: {
    // Leave space below form
    height: 150,
  },
  freeTag: {
    alignSelf: 'flex-start',
    padding: '4px 6px',
    border: '1px solid white',
    borderRadius: 6,
    color: 'white',
  },
};

const blockTitle = (
  <Text size="block-title" noMargin>
    <Trans>Get a free sample in your email</Trans>
  </Text>
);

type Props = {|
  form: EducationForm,
  formError: ?React.Node,
  onChangeForm: EducationForm => void,
  onResetForm: () => void,
  onSendForm: () => Promise<void>,
  formStatus: EducationFormStatus,
  onLogin: () => void,
|};

const EducationMarketingSection = ({
  form,
  formError,
  onChangeForm,
  onResetForm,
  onSendForm,
  formStatus,
  onLogin,
}: Props) => {
  const { isMobile } = useResponsiveWindowSize();
  const gdevelopTheme = React.useContext(GDevelopThemeContext);
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true);
  const { openSubscriptionDialog } = React.useContext(
    SubscriptionSuggestionContext
  );

  const renderLogin = () => (
    <ColumnStackLayout noMargin expand>
      {blockTitle}
      <Text noMargin>
        <Trans>
          Please login to access free samples of the Education plan resources.
        </Trans>
      </Text>
      <Line noMargin justifyContent="flex-end">
        <RaisedButton primary label={<Trans>Login</Trans>} onClick={onLogin} />
      </Line>
    </ColumnStackLayout>
  );

  const renderLoader = () => (
    <ColumnStackLayout noMargin expand>
      {blockTitle}
      <PlaceholderLoader />
    </ColumnStackLayout>
  );
  const renderError = () => (
    <ColumnStackLayout noMargin expand>
      {blockTitle}
      <PlaceholderError onRetry={onResetForm}>
        <Trans>
          An error occurred when sending the form, please verify your internet
          connection and try again later.
        </Trans>
      </PlaceholderError>
    </ColumnStackLayout>
  );

  const renderSuccess = () => (
    <ColumnStackLayout noMargin expand>
      {blockTitle}
      <Text noMargin>
        <Trans>
          Form sent with success. You should receive an email in the next
          minutes.
        </Trans>
      </Text>
      <Line noMargin justifyContent="flex-end">
        <FlatButton
          label={<Trans>Send a new form</Trans>}
          onClick={onResetForm}
        />
      </Line>
    </ColumnStackLayout>
  );

  const renderForm = () => (
    <Form
      onSubmit={onSendForm}
      autoComplete="on"
      name="education-form"
      fullWidth
    >
      <ColumnStackLayout noMargin expand>
        {blockTitle}
        <LineStackLayout noMargin>
          <TextField
            value={form.firstName}
            floatingLabelText={<Trans>First name</Trans>}
            fullWidth
            type="text"
            required
            onChange={(e, value: string) => {
              onChangeForm({ ...form, firstName: value.slice(0, 100) });
            }}
            onBlur={event => {
              onChangeForm({
                ...form,
                firstName: event.currentTarget.value.trim(),
              });
            }}
          />
          <TextField
            value={form.lastName}
            floatingLabelText={<Trans>Last name</Trans>}
            fullWidth
            type="text"
            required
            onChange={(e, value: string) => {
              onChangeForm({ ...form, lastName: value.slice(0, 100) });
            }}
            onBlur={event => {
              onChangeForm({
                ...form,
                lastName: event.currentTarget.value.trim(),
              });
            }}
          />
        </LineStackLayout>
        <TextField
          required
          value={form.email}
          floatingLabelText={<Trans>Email</Trans>}
          onChange={(e, value) => {
            if (!isEmailValid) setIsEmailValid(true);
            onChangeForm({ ...form, email: value });
          }}
          errorText={
            !isEmailValid ? <Trans>Invalid email address.</Trans> : undefined
          }
          type="email"
          fullWidth
          onBlur={event => {
            const trimmedEmail = event.currentTarget.value.trim();
            onChangeForm({ ...form, email: trimmedEmail });
            setIsEmailValid(emailRegex.test(trimmedEmail));
          }}
        />
        <Line noMargin justifyContent="space-between" alignItems="center">
          {formError ? (
            <Text noMargin color="error">
              {formError}
            </Text>
          ) : (
            <span />
          )}
          <RaisedButton
            primary
            label={<Trans>Send</Trans>}
            onClick={onSendForm}
          />
        </Line>
      </ColumnStackLayout>
    </Form>
  );

  return (
    <SectionContainer title={<Trans>Classrooms</Trans>}>
      <SectionRow>
        <CardWidget size="banner">
          <div style={styles.banner}>
            <ResponsiveLineStackLayout noColumnMargin alignItems="center">
              <Column noMargin alignItems="center">
                <Education style={styles.educationIcon} />
              </Column>
              <ColumnStackLayout
                expand
                alignItems={isMobile ? 'stretch' : 'flex-start'}
              >
                <Text size="block-title" noMargin>
                  <Trans>Purchase the Education subscription</Trans>
                </Text>
                <Text noMargin align="left">
                  <Trans>
                    The Education subscription gives access to GDevelop's Game
                    Development curriculum. Co-created with teachers and
                    institutions, it’s a ready-to-use, proven way to implement
                    STEM in your classroom.
                  </Trans>
                </Text>
                <Spacer />
                <ResponsiveLineStackLayout noColumnMargin noMargin>
                  <div style={styles.buttonContainer}>
                    <FlatButton
                      primary
                      fullWidth
                      onClick={() => {
                        Window.openExternalURL('https://gdevelop.io/education');
                      }}
                      label={<Trans>Learn more</Trans>}
                    />
                  </div>
                  <div style={styles.buttonContainer}>
                    <RaisedButton
                      primary
                      fullWidth
                      icon={<ShinyCrown fontSize="small" />}
                      onClick={() => {
                        openSubscriptionDialog({
                          filter: 'education',
                          analyticsMetadata: {
                            reason: 'Callout in Classroom tab',
                          },
                        });
                      }}
                      label={<Trans>Subscribe to Edu</Trans>}
                    />
                  </div>
                </ResponsiveLineStackLayout>
              </ColumnStackLayout>
            </ResponsiveLineStackLayout>
          </div>
        </CardWidget>
      </SectionRow>
      <SectionRow>
        <div
          style={{
            ...styles.freeTag,
            color: gdevelopTheme.statusIndicator.success,
            borderColor: gdevelopTheme.statusIndicator.success,
          }}
        >
          <Text noMargin color="inherit">
            <Trans>Free</Trans>
          </Text>
        </div>
        <Text size="section-title">
          <Trans>Get our teaching resources</Trans>
        </Text>
        <Text>
          <Trans>
            We’ll send to your email:
            <li>An extract of our ready-to-teach Curriculum</li>
            <li>
              A poster with GDevelop's core concepts to use in your classroom
            </li>
            <li>“Game Development as an Educational wonder” PDF</li>
          </Trans>
        </Text>
        <ResponsiveLineStackLayout noColumnMargin useLargeSpacer>
          <img
            src="res/education-posters.png"
            alt="GDevelop education posters preview"
            style={isMobile ? styles.mobilePostersImage : styles.postersImage}
          />
          <div style={styles.rightPartContainer}>
            {formStatus === 'login'
              ? renderLogin()
              : formStatus === 'sending'
              ? renderLoader()
              : formStatus === 'error'
              ? renderError()
              : formStatus === 'success'
              ? renderSuccess()
              : renderForm()}
          </div>
        </ResponsiveLineStackLayout>
      </SectionRow>
      {isMobile && <div style={styles.mobileFooter} />}
    </SectionContainer>
  );
};

export default EducationMarketingSection;
