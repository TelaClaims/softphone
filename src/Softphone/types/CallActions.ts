import { Status } from "../context/types";
import { ContactInput } from "./Contact";

export type CallActions = {
  mute?: boolean;
  hold?: boolean;
  keypad?: boolean;
  transfer?: boolean;
};

export type Actions = {
  onFetchToken: (identity: string) => Promise<string>;
  onChangeStatus?: (status: Status) => void;
  onLookupContact?: (contactToLookup: string) => Promise<ContactInput[]>;
  onClickMakeCallButton?: (contact: ContactInput, context: unknown) => void;
};
