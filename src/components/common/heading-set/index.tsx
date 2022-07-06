import clsx from 'clsx'
import { FC } from 'react'

import s from './heading-set.module.scss'

type HeadingSetProps = {
  overtitle?: string | JSX.Element
  title?: string | JSX.Element
  description?: string | JSX.Element
  centered?: boolean
  className?: string
}

export const HeadingSet: FC<HeadingSetProps> = ({
  overtitle,
  title,
  description,
  centered = false,
  className
}) => (
  <div
    className={clsx(s['heading-set'], { [s['centered']]: centered }, className)}
  >
    {overtitle && <p className={s['heading-set__overtitle']}>{overtitle}</p>}
    {title && <h3 className={s['heading-set__title']}>{title}</h3>}
    {description && (
      <p className={s['heading-set__description']}>{description}</p>
    )}
  </div>
)
