import { Call, Device } from "@twilio/voice-sdk";
import {
  CallAction,
  Contact,
  ContactInput,
  Events,
  SoftphoneSettings,
} from "../../types";

export type Views =
  | "inactive"
  | "active"
  | "lookup"
  | "contact"
  | "ringing"
  | "on-call"
  | "incoming";

export type ContactStatus =
  | "available"
  | "do-not-disturb"
  | "offline"
  | "unknown";

export type InitialState = {
  device?: Device;
  call?: Call;
  view: Views;
  status: ContactStatus;
  contact: Contact;
  contactSelected?: Contact;
  events?: Events;
  callActions?: CallAction[];
  alert?: {
    message: string;
    context?: string;
    severity?: "critical" | "regular";
    type: "error" | "warning" | "info" | "success";
  };
  ledIndicator?: boolean;
};

export type SoftphoneAction = {
  type:
    | "setView"
    | "setStatus"
    | "setContact"
    | "setAlert"
    | "setDevice"
    | "setCall"
    | "selectContact"
    | "setEvents"
    | "setCallActions"
    | "setLedIndicator";
  payload: Partial<InitialState>;
};

export type SoftphoneDispatch = {
  setView: (view: Views) => void;
  setStatus: (status: ContactStatus) => void;
  initializeDevice: (softphoneSettings: SoftphoneSettings) => void;
  setAlert: (alert: InitialState["alert"]) => void;
  clearAlert: () => void;
  destroyDevice: () => void;
  selectContact: (contact: ContactInput, view?: Views) => void;
  clearSelectedContact: () => void;
  makeCall: (contact?: ContactInput, params?: Record<string, unknown>) => void;
  hangUp: () => void;
  updateCallAction: (
    callActionId: string,
    { loading, disabled }: { loading?: boolean; disabled?: boolean }
  ) => void;
  setLedIndicator: (status: boolean) => void;
};
