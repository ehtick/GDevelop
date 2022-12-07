// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button';
import { type ButtonInterface } from './Button';
import { Spacer } from './Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { tooltipEnterDelay } from './Tooltip';

// We support a subset of the props supported by Material-UI v0.x FlatButton
// They should be self descriptive - refer to Material UI docs otherwise.
type Props = {|
  label: React.Node,
  onClick: ?(ev: any) => void | Promise<void>,
  primary?: boolean,
  disabled?: boolean,
  keyboardFocused?: boolean,
  fullWidth?: boolean,
  leftIcon?: React.Node,
  rightIcon?: React.Node,
  style?: {|
    marginTop?: number,
    marginBottom?: number,
    marginLeft?: number,
    marginRight?: number,
    margin?: number,
    flexShrink?: 0,
  |},
  target?: '_blank',
  id?: ?string,

  // Tooltips aren't really suited for TextButtons UX-wise, but we can use them for
  // accessibility purpose for the Toolbar.
  exceptionalTooltipForToolbar?: React.Node,
|};

/**
 * A "outlined" button based on Material-UI button.
 */
const FlatButton = React.forwardRef<Props, ButtonInterface>(
  (
    {
      label,
      primary,
      leftIcon,
      rightIcon,
      keyboardFocused,
      exceptionalTooltipForToolbar,
      disabled,
      id,
      ...otherProps
    }: Props,
    ref
  ) => {
    // In theory, focus ripple is only shown after a keyboard interaction
    // (see https://github.com/mui-org/material-ui/issues/12067). However, as
    // it's important to get focus right in the whole app, make the ripple
    // always visible to be sure we're getting focusing right.
    const focusRipple = true;

    const button = (
      <Button
        variant="outlined"
        size="small"
        color={primary ? 'secondary' : 'default'}
        autoFocus={keyboardFocused}
        focusRipple={focusRipple}
        disabled={disabled}
        id={id}
        {...otherProps}
        ref={ref}
      >
        {leftIcon}
        {leftIcon && <Spacer />}
        {label}
        {rightIcon && <Spacer />}
        {rightIcon}
      </Button>
    );

    return exceptionalTooltipForToolbar && !disabled ? (
      <Tooltip
        title={exceptionalTooltipForToolbar}
        placement="bottom"
        enterDelay={tooltipEnterDelay}
      >
        {button}
      </Tooltip>
    ) : (
      button
    );
  }
);

export default FlatButton;
