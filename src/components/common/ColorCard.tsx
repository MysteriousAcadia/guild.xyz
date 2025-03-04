import { Box, useColorMode } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { PropsWithChildren } from "react"
import { Rest } from "types"
import Card from "./Card"

type Props = {
  color: string
} & Rest

const MotionBox = motion(Box)

const ColorCard = ({
  color,
  children,
  ...rest
}: PropsWithChildren<Props>): JSX.Element => {
  const { colorMode } = useColorMode()
  return (
    <Box position="relative" width="full" {...rest}>
      <MotionBox
        position="absolute"
        inset={-0.5}
        top={0.5}
        bgColor={color}
        borderRadius="2xl"
        filter="auto"
        blur="8px"
        initial={{
          opacity: 0.25,
        }}
        animate={{
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{ ease: "linear", duration: 2, repeat: Infinity }}
      />
      <Card
        role="group"
        position="relative"
        p={{ base: 5, sm: 7 }}
        w="full"
        h="full"
        bg={colorMode === "light" ? "white" : "gray.700"}
        borderWidth={2}
        borderColor={color}
        overflow="visible"
      >
        {children}
      </Card>
    </Box>
  )
}

export default ColorCard
