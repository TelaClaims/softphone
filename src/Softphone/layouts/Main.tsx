import { Box } from "@mui/material";
import { CallStatus, SelectStatus } from "../components";
import { useSoftphone } from "../context/context";
import {
  ActiveView,
  ContactView,
  IncomingView,
  LookupView,
  OnCallView,
  RingingView,
} from "../views";
import Layout from "./Layout";

export const Main = () => {
  const { view, device, call } = useSoftphone();

  return (
    <>
      <Layout.Top>
        <Box height={"4em"}>
          {device?.isBusy && call ? <CallStatus /> : <SelectStatus />}
        </Box>
      </Layout.Top>
      <Layout.View>
        {view === "active" && <ActiveView />}
        {view === "lookup" && <LookupView />}
        {view === "contact" && <ContactView />}
        {view === "ringing" && <RingingView />}
        {view === "on-call" && <OnCallView />}
        {view === "incoming" && <IncomingView />}
      </Layout.View>
    </>
  );
};
