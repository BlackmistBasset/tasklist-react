import './App.css';
import { Center, Input, Button, Heading, Box, HStack, useColorMode, useColorModeValue } from '@chakra-ui/react'
import {useState} from 'react'
import {Task} from './components/Task'
import { v4 as idGenerator } from 'uuid'
import { FaRegMoon } from "react-icons/fa";

function App() {


const { colorMode, toggleColorMode } = useColorMode()

const details = useColorModeValue('#C9E4D6', '#41759A')
const containers = useColorModeValue('#70a288', '#04395e')
const textColor = useColorModeValue('#031d44', '#ABC7DC')


  const [task, setTask] = useState([{
    id: idGenerator(),
    text: 'Check me!',
    checked: false
  }])

  const [filter, setFilter] = useState(0)


  const deleteTask = (taskId) => {
    let newTaskList = task.filter( item => item.id !== taskId )
    setTask (newTaskList)
  }


  const setCheck = (id) => {
    const newTaskList = task.map(item => {
      if (item.id === id){
        item.checked = !item.checked
      }
      return item
    })
    setTask(newTaskList)
  }


  return (
    <Center 
      flexDirection='column'
    >

      <Box 
        display='flex' 
        flexDirection='column'
        mt='60px' 
        bg={containers}
        color={textColor}
        padding='10' 
        w='40%' 
        borderRadius='15'
      >

        <Heading 
          display='flex' 
          justifyContent='space-between' 
          color={textColor}
        > ToDo App  

          <Button  
            w='24' 
            color={textColor}
            onClick={toggleColorMode} 
            display="flex" 
            alignItems="center" 
            justifyContent="space-between"
            bg={details}
          >

            <FaRegMoon  /> {colorMode === 'light' ? 'Dark' : 'Light'}

          </Button>

        </Heading> 

        <Input 
          placeholder='Ingrese su tarea' 
          mt='5' 
          bg={details}
          onKeyDown={(e) => {
            if (e.key === 'Enter'){
              setTask([...task, {id: idGenerator(), text: e.target.value, checked: false}])
              e.target.value = ""
            }
          }} 
        />

      </Box>
      
      <Box 
        display='flex' 
        flexDirection='column' 
        mt='5' 
        alignItems='center'  
        bg={containers}
        padding='5' 
        w='40%' 
        borderRadius='15'
      >

        <HStack 
          spacing='20px'
        >

          <Button 
            variant='outline' 
            onClick={() => setFilter(0)}
            color={textColor}
          > Todos
          </Button>

          <Button 
            variant='outline' 
            onClick={() => setFilter(1)}
            color={textColor}
          > Completos 
          </Button>

          <Button  
            variant='outline' 
            onClick={() => setFilter(2)}
            color={textColor}
          > Incompletos 
          </Button>

        </HStack> 

        {task.filter(element => {
          if(filter === 0 || (filter===1 && element.checked) || (filter === 2 && !element.checked)){
            return true
          }
          return false
        }).map(element => <Task 
                            key={element.id} 
                            id={element.id} 
                            text={element.text} 
                            checked={element.checked} 
                            deleteTask={deleteTask} 
                            setCheck={setCheck} 
                            task={task} 
                            setTask={setTask}
                          /> )}

      </Box>

  </Center>
  
  )  
}

export default App;
