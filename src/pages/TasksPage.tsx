import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { TaskList } from '../components/TaskList'
import { useTasks } from '../hooks/useTasks'
import { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

export function TasksPage() {
  const { tasks, loading, error, refetch } = useTasks()

  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  const filteredTasks = statusFilter === 'ALL'
    ? tasks
    : tasks.filter((task) => task.status === statusFilter)

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
        <FormControl size="small" sx={{ minWidth: 180, mb: 2 }}>
          <InputLabel id="status-filter-label">Filtrar por estado</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            label="Filtrar por estado"
            onChange={(e: SelectChangeEvent<string>) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="ALL">Todas</MenuItem>
            <MenuItem value="TODO">Pendiente</MenuItem>
            <MenuItem value="IN_PROGRESS">En progreso</MenuItem>
            <MenuItem value="DONE">Completada</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Paper sx={{ p: 3 }}>
        <TaskList tasks={filteredTasks} loading={loading} error={error} onChanged={refetch} />
      </Paper>
    </Box>
  )
}