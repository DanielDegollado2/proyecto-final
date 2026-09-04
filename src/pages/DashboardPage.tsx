import LogoutIcon from '@mui/icons-material/Logout'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import ViewListIcon from '@mui/icons-material/ViewList'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { ProjectForm } from '../components/ProjectForm'
import { ProjectList } from '../components/ProjectList'
import { useAuth } from '../hooks/useAuth'
import { useProjectForm } from '../hooks/useProjectForm'
import { useProjects } from '../hooks/useProjects'
import { useState } from 'react'

export function DashboardPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { projects, loading, error, refetch } = useProjects()
  const projectForm = useProjectForm({
    onSuccess: () => {
      refetch()
      setCreatingProject(false)
    }
  })
  const [creatingProject, setCreatingProject] = useState(false)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <>
      <Box maxWidth="auto" mx="auto" mt={6} >
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
            Dashboard
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button startIcon={<CreateNewFolderIcon />} onClick={() => setCreatingProject(true)}>
              Crear proyecto
            </Button>
            <Button startIcon={<ViewListIcon />} onClick={() => navigate('/tasks')}>
              Ver todas las tareas
            </Button>
            <Button startIcon={<LogoutIcon />} onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Stack>
        </Stack>

        <Paper sx={{ p: 3 }}>
          <ProjectList
            projects={projects}
            loading={loading}
            error={error}
            onChanged={refetch}
          />
        </Paper>
      </Box>

      <Dialog open={creatingProject} onClose={() => setCreatingProject(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <ProjectForm {...projectForm} onClose={() => setCreatingProject(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}