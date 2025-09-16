import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { MenuItem, TextField } from '@mui/material';
import type { Task } from '@/types/task';
import dayjs from 'dayjs';
const drawerBleeding = 56;

interface Props {
    tasks : Task[]
    window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100],
  ...theme.applyStyles('dark', {
    backgroundColor: (theme.vars || theme).palette.background.default,
  }),
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[800],
  }),
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900],
  }),
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);
  const [filterTasksGroup , setFilterTasksGroup] = React.useState([] as Task[])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const chatSend = async (e: number):Promise<unknown> => {
    const  res = await createImageBitmap.arguments(e)
    return res
  }
  chatSend(1)
  const container = window !== undefined ? () => window().document.body : undefined;
  const chooseGroup = (choice : string)=>{
    const FilterTasks = props.tasks?.filter(task => task.categories === choice)
    setFilterTasksGroup(FilterTasks)

  }
  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Check</Button>
        <TextField
            select
            label='Group task'
            fullWidth
            margin='dense'
            onClick={toggleDrawer(true)}
            onChange={(e)=> chooseGroup(e.target.value)}
        >   
            <MenuItem value='general'>Общие</MenuItem>
            <MenuItem value='edu'>Образование(саморазвитие)</MenuItem>
            <MenuItem value='job'>Работа</MenuItem>
            <MenuItem value='personal'>Личное</MenuItem>
            <MenuItem value='inter'>INT</MenuItem>

        </TextField>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
        {filterTasksGroup && filterTasksGroup.map(task => (
            <Box>
                <Typography>
                    {task.title}
                </Typography>
                <Typography>
                    {task.categories}
                </Typography>
                <Typography>
                    {dayjs(task.notification).format('DD MM YYYY, HH:mm')}
                </Typography>
                <Typography>
                    {task.completed}
                </Typography>
                <Typography>
                    {task.priority}
                </Typography>
            </Box>
        ))}
        </StyledBox>
        <StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
          <Skeleton variant="rectangular" height="100%" />
        </StyledBox>
      </SwipeableDrawer>
        </Root>
        );
        }
