import { Tooltip, TooltipProps } from "@mui/material";
import * as React from "react";

interface ChildProps {
  copy: (content: any) => void;
}

interface Props {
  TooltipProps?: Partial<TooltipProps>;
  children: (props: ChildProps) => React.ReactElement<any>;
}

interface OwnState {
  showTooltip: boolean;
}

/**
 * Render prop component that wraps element in a Tooltip that shows "Copied to clipboard!" when the
 * copy function is invoked
 */
class CopyToClipboard extends React.Component<Props, OwnState> {
  public state: OwnState = { showTooltip: false };

  public render() {
    return (
      <Tooltip
        //interactive={true}
        disableInteractive
        open={this.state.showTooltip}
        title={"Скопировано!"}
        leaveDelay={1500}
        onClose={this.handleOnTooltipClose}
        {...this.props.TooltipProps || {}}
      >
        {this.props.children({ copy: this.onCopy }) as React.ReactElement<any>}
      </Tooltip>
    );
  }

  private onCopy = (content: any) => {
    navigator.clipboard.writeText(content);
    this.setState({ showTooltip: true });
  };

  private handleOnTooltipClose = () => {
    this.setState({ showTooltip: false });
  };
}

export default CopyToClipboard;

