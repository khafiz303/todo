import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import type {Task} from '@/types/task'
interface BasicSpeedDialProps {
    tasks : Task[]
}

export default function BasicSpeedDial({tasks}: BasicSpeedDialProps) {
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {tasks.map((task) => (
          <SpeedDialAction
            key={task.categories}
            icon={task.priority}
            slotProps={{
              tooltip: {
                title: task.title,
              },
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
