import React from 'react'
import NextLink from 'next/link'

const InternalLink = React.forwardRef((props, ref) => {
  // Peel off the onClick handler if given and the next props...
  const { href, as, onClick, ...rest } = props

  // I defined the handler in the component here because I need access to react context ala useContext ... not demonstrated here
  const wrappedOnClick = (e) => {
    if (onClick) {
      // If the consumer passed in onClick, call it
      onClick(e)
    }

    // Record analytics, close menus, etc
  }

  return (
    <NextLink {...{ href, as }}>
      <a ref={ref} {...rest} onClick={wrappedOnClick} />
    </NextLink>
  )
})

export default InternalLink
