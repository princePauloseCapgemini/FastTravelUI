import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const customSelect = definePartsStyle({
  // define the part you're going to style
  field: {
    background: "#eee",
    borderRadius: "md",
    height: "50px",
  },
  icon: {
    color: 'black.400',
  },
})

export const selectTheme = defineMultiStyleConfig({
    variants: { customSelect },
  });