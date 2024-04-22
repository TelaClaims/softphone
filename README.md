# Softphone Component

The `Softphone` component is a comprehensive solution for call management within your React applications. It provides a rich and extensible interface for making and managing calls. Additionally, it includes options to customize the appearance and behavior of the component.

## Features

- **Call Management**: Make calls and manage their status.
- **Automatic Registration**: Supports automatic user registration.
- **Customizable Rendering**: Customize how contacts are displayed.
- **Various Events**: Manage events such as call reception and status changes.
- **Sidebar Integration**: Includes configurable options for an interactive sidebar.

## Installation

```bash
npm install @telaclaims-tech/softphone
```

## Requirements and Dependencies

- [Node.js v16.16.0](https://nodejs.org/en/download/) - Required for running JavaScript applications.
- [React v17.0.2](https://www.npmjs.com/package/react) - Required for building user interfaces.
- [MUI Material v5.15.15](https://www.npmjs.com/package/@mui/material) - Provides Material Design UI components.
- [Twilio Voice SDK v2.10.2](https://www.npmjs.com/package/@twilio/voice-sdk) - Allows making and receiving phone calls directly in your apps.
- [libphonenumber-js v1.10.60](https://www.npmjs.com/package/libphonenumber-js) - A library for parsing, formatting, and validating international phone numbers.

## Usage

Below is a basic example of how to use the `Softphone` component:

```jsx
import Softphone from "@telaclaims-tech/softphone";

function App() {
  const onFetchToken = async (identity) => {
    // Fetch and return a Twilio token for the given identity.
  };

  return <Softphone contact={{ identity: "test" }} events={{ onFetchToken }} />;
}
```

## Types

### `ContactInput`

This type represents the input structure required for contact-related operations in the Softphone component.

```typescript
type ContactInput = ContactConstructorArgs | Contact;
```

### `ContactConstructorArgs`

This type represents the constructor arguments for creating a new contact.

```typescript
type ContactConstructorArgs = {
  identity: string;
  id?: string;
  label?: string;
  isNew?: boolean;
  status?: ContactStatus;
  avatar?: string;
  type?: "phone" | "identifier";
  data?: Record<string, unknown>;
};
```

**Properties:**

- **`identity`** _`required`_: The unique identifier for the contact used to communicate with Twilio and associated to the token.

- **`id`** _`(default: uuidv4)`_: Other unique identifier for the contact.

- **`label`** _`(default: identity)`_: The display name for the contact.

- **`isNew`** _`(default: false)`_: Indicates if the contact is new. display a New Icon in the contact list.

- **`status`** _`("available" | "unavailable" | "unknown"(default))`_: The status of the Device.

- **`avatar`** _`(default: "/")`_: The URL of the contact's avatar.

- **`type`** _`("phone" | "identifier"(default))`_: The type of contact. phone if the identity is a valid Phone Number. identifier otherwise.

- **`data`** _`({})`_: Additional data for the contact. Used in combination to the `onRenderContact` to extend the contact view

### `Contact`

This is a base class for the contact object. It represents a contact in the Softphone component. Exported to use.

```typescript
const contact = new Contact(...ContactConstructorArgs);
```

or

```typescript
const contact = Contact.buildContact(...ContactInput);
```

### `SoftphoneSettings`

This type represents the settings for the Softphone component.

```typescript
type SoftphoneSettings = {
  contact: ContactInput;
  autoRegister?: boolean;
  events: Events;
};
```

**Properties:**

- **`contact`** _`required`_: The registered contact.

- **`events`** _`required`_: The event handlers for the Softphone component. See the `Events` type for more details.

- **`autoRegister`** _`(default: false)`_: Automatically register the device on initialization.

### `Events`

This type represents the event handlers for the Softphone component. They are dispatched when specific events occur within the component.

```typescript
type Events = {
  onFetchToken: (identity: string, context: EventContext) => Promise<string>;
  onChangeStatus?: (status: Status, context: EventContext) => void;
  onIncomingCall?: (
    call: Call,
    context: EventContext
  ) => ContactInput | undefined;
};
```

**Properties:**

- **`onFetchToken`** _`required`_: Fetches the Twilio token for the given identity.

- **`onChangeStatus`** _`(optional)`_: Handles the status change event for the device(`registered`, `unregistered`). Triggered when the device status changes.

- **`onIncomingCall`** _`(optional)`_: Handles the incoming call event. Triggered when a call is received.

### `EventContext`

This type represents the context object for the event handlers in the Softphone component. It provides information about the current state of the component.

```typescript
type EventContext = {
  device?: Device;
  call?: Call;
  contact: Contact;
  contactSelected?: Contact;
  status: Status;
  view: Views;
};
```

**Properties:**

- **`device`** _`(optional)`_: The current Twilio device instance.

- **`call`** _`(optional)`_: The current Twilio call instance.

- **`contact`** _`required`_: The registered Contact.

- **`contactSelected`** _`(optional)`_: The contact selected. This contact selected could be selected by the user in the contact list, or the contact that is calling. Also using the functions `lookupContact` or `makeCall` using the useSoftphone hook.

- **`status`** _`required`_: The current status of the device.

- **`view`** _`required`_: The current view of the Softphone component. Example: `"ringing"` | `"on-call"` | `"incoming"`

### `Handlers`

This type represents the handlers for the Softphone component.

```typescript
type Handlers = {
  onLookupContact?: (contactToLookup: string) => Promise<ContactInput[]>;
  onClickMakeCallButton?: (contact: ContactInput) => void;
  onClickHoldCallButton?: (call: Call) => void;
  onClickTransferCallButton?: (call: Call) => void;
  onRenderContact?: (contact: ContactInput) => React.ReactNode | undefined;
};
```

**Properties:**

- **`onLookupContact`** _`(optional)`_: Looks up a contact by the given identity. This function is called when the user type for a contact in the search contact input. Provide the input typed by the user and return the contacts that match the input.

- **`onClickMakeCallButton`** _`(optional)`_: Handles the click event on the make call button. This function is called when the user clicks on the make call button. Provide the contact selected by the user to make the call.

- **`onClickHoldCallButton`** _`(optional)`_: Handles the click event on the hold call button. This function is called when the user clicks on the hold call button. Provide the call to hold.

- **`onClickTransferCallButton`** _`(optional)`_: Handles the click event on the transfer call button. This function is called when the user clicks on the transfer call button. Provide the call to transfer.

- **`onRenderContact`** _`(optional)`_: Renders the contact in the `contact` view. This function is called when the contact view is rendered. Provide the contact to render and return the JSX to render the contact. This is for customizing the contact view and extend the Contact selected.

### `Note`

The main difference between `Events` and `Handlers` is that `Events` are dispatched when specific events occur within the internal state between `Softphone` and `Twilio SDK` events. These events do not have access to the current state of the component. To access the current state of the component, the context object provided in the `Events` should be used. On the other hand, `Handlers` are functions that are called when the user interacts with the component, and they do have access to the current state of the component.

## Softphone Props

The `Softphone` component accepts the following props:

- **`contact`** _`ContactInput`_: The contact to register with the Softphone component.

- **`events`** _`Events`_: The event handlers for the Softphone component.

- **`autoRegister`** _`(default: false)`_: Automatically register the device on initialization.

- **`handlers`** _`Handlers`_: The handlers for the Softphone component.

- **`showStatus`** _`(default: false)`_: Show the status of the device in a bottom bar.

- **`styles`** _`ContainerStyles`_: Custom styles for the Softphone component. Styles that can be used are `width`, `height`, and `minHeight`.

- **`sidebar`** _`SideBarProps`_: Extend the softphone with a sidebar. The sidebar is a component that can be used to display additional information or actions.

## SideBar

The `SideBar` component is a component that can be used to display additional information or actions. It is a component that can be used to extend the Softphone component with additional information or actions.

### `SideBarProps`

This type represents the props for the SideBar component.

```typescript
type SideBarProps = {
  styles?: ContainerStyles;
  options?: SideBarOption[];
  onClickSideBarOption?: (option: SideBarOption) => void;
};
```

**Properties:**

- **`styles`** _`ContainerStyles`_: Custom styles for the SideBar component. Styles that can be used are `width`, `height`, and `minHeight`.

- **`options`** _`SideBarOption[]`_: The options to display in the SideBar component.

- **`onClickSideBarOption`** _`(optional)`_: Handles the click event on the SideBar option. This function is called when the user clicks on a SideBar option. Provide the option clicked by the user.

### `SideBarOption`

This type represents the options for the SideBar component.

```typescript
type SideBarOption = {
  id: string;
  title: string;
  position?: "top" | "bottom";
  component: React.ReactNode;
  panelComponent?: React.ReactNode;
};
```

**Properties:**

- **`id`** _`required`_: The unique identifier for the option.

- **`title`** _`required`_: The title of the option.

- **`position`** _`(default: "top")`_: The position of the option in the SideBar component.

- **`component`** _`required`_: The option component to render.

- **`panelComponent`** _`(optional)`_: The panel component to render when the option is clicked.

## Hooks

### `useSoftphone`

The `useSoftphone` hook provides access to the Softphone component's state and methods. It can be used to interact with the Softphone component programmatically.

```jsx
import { useSoftphone } from "@telaclaims-tech/softphone";

function App() {
  const {
    isBusy,
    currentCall,
    lookupContact,
    makeCall } = useSoftphone();

  return (
   // ...
  );
}
```

**Properties:**

- **`isBusy`** _`boolean`_
  : Indicates if the Softphone component is busy.

- **`currentCall`** _`Call`_ : The current call object.

- **`lookupContact`** _`(contactToLookup: ContactInput): void`_ : Select a contact directly.

- **`makeCall`** `({
  contact,
  params,
}: {
  contact?: ContactInput;
  params?: Record<string, unknown>;
}): void` : Start a call with the given contact using the params provided.

### `useSideBar`

The `useSideBar` hook provides access to the SideBar component's state and methods. It can be used to interact with the SideBar component programmatically.

```jsx
import { useSideBar } from "@telaclaims-tech/softphone";

function App() {
  const {
    openSideBar } = useSideBar();

  return (
   // ...
  );
}
```

**Properties:**

- **`openSideBar`** _`(optionId: string): void`_ : Open the SideBar with the given option id.
