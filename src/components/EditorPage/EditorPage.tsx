import { Flex } from '@chakra-ui/react'
import { SideBar } from './SideBar'
import { Canvas } from './Canvas'
import { Inspector } from './Inspector'

const EditorPage = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="space-around">
      <SideBar />
      <Canvas fields={[]} />
      <Inspector />
    </Flex>
  )
}
export { EditorPage }
