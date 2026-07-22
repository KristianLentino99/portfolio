import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonBaseProps {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
}

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
    href: string
    rel?: string
    target?: string
  }

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    href?: never
    type?: 'button' | 'submit'
  }

export type ButtonProps = ButtonAsLink | ButtonAsButton

export default function Button(props: ButtonProps) {
  const { variant = 'primary', children, className = '' } = props

  const variantClass = variant === 'primary' ? 'button-primary' : 'button-secondary'
  const classes = `button ${variantClass} ${className}`.trim()

  if ('href' in props && props.href) {
    const { /* eslint-disable @typescript-eslint/no-unused-vars */ variant: _, ...linkRest } =
      props as ButtonAsLink
    return (
      <a className={classes} {...linkRest}>
        {children}
      </a>
    )
  }

  const { /* eslint-disable @typescript-eslint/no-unused-vars */ variant: _, ...btnRest } =
    props as ButtonAsButton
  return (
    <button className={classes} type={(props as ButtonAsButton).type ?? 'button'} {...btnRest}>
      {children}
    </button>
  )
}
