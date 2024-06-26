import { useSoftphone } from "@/Softphone/context/Softphone/context";
import { Box, Chip } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";

export const CallStatus = () => {
  const { call } = useSoftphone();

  const callStatus = call?.status();

  return (
    <Box position={"relative"}>
      {callStatus && (
        <Chip
          size="small"
          icon={<CallIcon />}
          label={call?.status()}
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />
      )}
    </Box>
  );
};
