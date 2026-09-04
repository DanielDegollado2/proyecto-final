import AssignmentIcon from '@mui/icons-material/Assignment'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useTaskForm } from '../hooks/useTaskForm'
import { useProjectTasks } from '../hooks/useProjectTasks'
import { useState } from 'react'
import { useProject } from '../hooks/useProject'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { type SelectChangeEvent } from '@mui/material/Select'

export function ProjectTasksPage() {
    const { projectId } = useParams<{ projectId: string }>()
    const { tasks, loading, error, refetch } = useProjectTasks(projectId ? parseInt(projectId, 10) : null)
    const taskForm = useTaskForm({
        projectId: projectId ? parseInt(projectId, 10) : 0, onSuccess: () => {
            refetch()
            setCreatingTask(false)
        }
    })
    const [creatingTask, setCreatingTask] = useState(false)
    const { project } = useProject({ projectId: projectId ? parseInt(projectId, 10) : 0 })
    const [statusFilter, setStatusFilter] = useState<string>('ALL')

    const filteredTasks = statusFilter === 'ALL'
        ? tasks
        : tasks.filter((task) => task.status === statusFilter)

    return (
        <>
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
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            {project && project.name}
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
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
                        <Button startIcon={<AssignmentIcon />} onClick={() => setCreatingTask(true)}>
                            Crear tarea
                        </Button>
                    </Stack>
                </Stack>


                <Paper sx={{ p: 3 }}>
                    <TaskList tasks={filteredTasks} loading={loading} error={error} onChanged={refetch} />
                </Paper>
            </Box>

            <Dialog open={creatingTask} onClose={() => setCreatingTask(false)} fullWidth maxWidth="sm">
                <DialogContent>
                    <TaskForm {...taskForm} onClose={() => setCreatingTask(false)} />
                </DialogContent>
            </Dialog>
        </>
    )
}