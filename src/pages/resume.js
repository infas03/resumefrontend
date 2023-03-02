import React from "react";
import { Box } from "@mui/material";
import Header from "../components/header/header.js";
import ResumeView from "../components/resume_view/resumeComponent.js";
import LeftMenu from "../components/resume_view/leftMenu.js";

const Resume = () => {
  return(
    <div>
    <Header/>
    <Box mx={40} mt={2}>
      <Box display={"inline-block"} width={200}>
        <LeftMenu />
      </Box>
      <Box display={"inline-block"} width={600} sx={{verticalAlign:'top'}}>
        <ResumeView />
      </Box>
    </Box>
    </div>
  );
}
export default Resume;