import { Checkbox, Button, Text, Box, Input } from "@chakra-ui/react"
import { useState } from "react";
import { RiDeleteBinLine } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'

export const Task = ({ id, text, checked, deleteTask, setCheck, task, setTask }) => {
  const [edit, setEdit] = useState(false)
  const [inputEdit, setInputEdit] = useState(text)

    if(edit){
      return(
        <Input
          mt="5"
          value={inputEdit} 
          onChange={(e) => setInputEdit(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
              setTask(task.map(item => {
                  if(item.id === id) {
                    return { ...item, text: e.target.value }
                  }
                  return item
                })
              )
              setEdit(false)
            }
          }}
        />
      )
    }

    return(
      <Box 
        mt="5" 
        display="flex" 
        justifyContent="space-between" 
        w="100%"
      >

        <Checkbox 
          defaultChecked={checked} 
          onChange={() => setCheck(id)}
        >

          <Text 
            color='white'
            as={checked ? "s" : ""}
            fontSize='lg'
          >{text}
          </Text>

        </Checkbox>

      <Box>

        <Button
          size="sm"
          bg="transparent"
          border="1px white solid"
          mr="2"
          onClick={() => setEdit(true)}
          fontSize='lg'
        >

          <AiOutlineEdit />

        </Button>

        <Button 
          backgroundColor="red" 
          size="sm" 
          onClick={() => deleteTask(id)}
          fontSize='lg'
        >

          <RiDeleteBinLine />

        </Button>

      </Box>

    </Box>
  )
}
