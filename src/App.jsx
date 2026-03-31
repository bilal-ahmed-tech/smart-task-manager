import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import TasksDetail from "./pages/TaskDetail";
import AddTask from "./pages/AddTask";
import NotFound from "./pages/NotFound";
import { TaskProvider, useTasks } from "./context/TaskContext";
import Navbar from "./components/layout/Navbar";
import MainLayout from "./components/layout/MainLayout";
import Toast from "./components/ui/Toast";
import EditTask from "./pages/EditTask"
function ToastManager() {
  const { toast, hideToast } = useTasks()
  
  if (!toast) return null
  
  return (
    <Toast
      message={toast.message}
      onUndo={toast.undoAction ? () => {
        toast.undoAction()
        hideToast()
      } : null}
      onClose={hideToast}
    />
  )
}
function App() {

  return (
    <BrowserRouter>
      <TaskProvider>
        <Navbar />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/add" element={<AddTask />} />
            <Route path="/tasks/:id" element={<TasksDetail />} />
            <Route path="/tasks/:id/edit" element={<EditTask />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
        <ToastManager />
      </TaskProvider>
    </BrowserRouter>
  )
}

export default App