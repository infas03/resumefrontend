import {Divider} from '@mui/material';
import { Paper } from '@mui/material';
import { MenuList } from '@mui/material';
import { MenuItem } from '@mui/material';
import {ListItemText} from '@mui/material';
import {ListItemIcon} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import SubjectIcon from '@mui/icons-material/Subject';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolIcon from '@mui/icons-material/School';
import ModeIcon from '@mui/icons-material/Mode';
import ListIcon from '@mui/icons-material/List';
import {ListSubheader} from '@mui/material';

const LeftMenu = () => {
  return (
    <Paper elevation={0}>
      <MenuList dense sx={{backgroundColor:'lightgray'}} 
        subheader={
        <ListSubheader sx={{backgroundColor:'lightgray'}}>
          RESUME SECTION
        </ListSubheader>
        }
      >
        <MenuItem>
          <ListItemIcon>
            <ArticleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={()=>{window.location.href='/headingedit'}}>Heading</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SubjectIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={()=>{window.location.href='/summeryedit'}}>Summery</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <WorkOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={()=>{window.location.href='/experienceedit'}}>Experience</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <SchoolIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={()=>{window.location.href='/educationedit'}}>Education</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={()=>{window.location.href='/skillsedit'}}>Skills</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ListIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText onClick={()=>{window.location.href='/competenciesedit'}}>Competencies</ListItemText>
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <ModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Hobbies</ListItemText>
        </MenuItem> */}
      </MenuList>
      <Divider/>
    </Paper>
  );
};
export default LeftMenu;
