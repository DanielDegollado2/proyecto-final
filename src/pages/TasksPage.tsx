import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { TaskList } from '../components/TaskList'
import { useTasks } from '../hooks/useTasks'

export function TasksPage() {
  const { tasks, loading, error, refetch } = useTasks()

  return (
    <Box maxWidth="auto" mx="auto" mt={6}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          px: 3,
          py: 2,
          mb: 3,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: 1,
          position: 'sticky',
          top: 0,
          zIndex: 1100,
        }}
      >
        <Typography variant="h6" fontWeight={500}>
          Tasks
        </Typography>
      </Stack>

      <Paper sx={{ p: 3 }}>
        <TaskList tasks={tasks} loading={loading} error={error} onChanged={refetch} />
      </Paper>
    </Box>
  )
}