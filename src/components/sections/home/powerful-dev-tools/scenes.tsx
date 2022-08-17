// import clamp from 'lodash/clamp'
import get from 'lodash/get'
import {
  ComponentRef,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { UseGsapTimeAPI } from '~/hooks/use-gsap-time'
import { clearProps, DURATION, gsap } from '~/lib/gsap'
import { rangeMap } from '~/lib/utils'

import { Code, Debugger, DevTools, OverboardStore } from '../overboard-story'
import {
  buildUuids,
  HTMLNode,
  IdentifiedNode,
  identifyNodes,
  ReactNode,
  useInspectElement
} from '../overboard-story/common'
import { Snapshot } from '../overboard-story/debugger'
import { DevToolsProps } from '../overboard-story/devtools'
import { ConsoleProps, Marker } from '../overboard-story/devtools/console'
import { NetworkCall } from '../overboard-story/devtools/network'
import {
  OverboardColors,
  OverboardStoreProps,
  StoreRef
} from '../overboard-story/overboard-store'

type SceneProps = {
  pauseTimeline?: () => void
  resumeTimeline?: () => void
  devtoolsProps?: Partial<DevToolsProps>
}

const printMarkers = [30, 36, 40, 55, 80]

export const Scene1: FC<SceneProps> = ({
  pauseTimeline,
  resumeTimeline,
  devtoolsProps
}) => {
  const [markersType, setMarkersType] = useState<Marker>('transparent')
  const [showPrints, setShowPrints] = useState(false)
  const codeRef = useRef<ComponentRef<typeof Code>>(null)
  const consoleRef = useRef()
  const timeline = useRef(gsap.timeline())
  const [currentHit, setCurrentHit] = useState(0)

  const fullLogs: ConsoleProps['logs'] = [
    {
      line: 5,
      hits: 5,
      marker: markersType,
      prepend: 'rotate',
      content: [60, 68, 80, 90, 120],
      hide: !showPrints
    },
    {
      hits: 1,
      marker: 'unicorn',
      prepend: 'Start 360',
      content: [{ left: 110, top: 25 }]
    }
  ]

  const updateMarkers = useCallback((marker, asChildTimeline = false) => {
    if (!consoleRef.current) return

    const timeline = gsap.timeline({
      autoRemoveChildren: !asChildTimeline
    })

    const consoleSelector = gsap.utils.selector(consoleRef.current)
    const allConsoleMarkers = consoleSelector('.marker[data-line="5"]')

    timeline.call(() => {
      setMarkersType(marker)
    }, undefined)

    timeline.to(allConsoleMarkers, {
      scale: 1.25,
      stagger: 0.05,
      duration: DURATION / 3
    })

    timeline.to(
      allConsoleMarkers,
      {
        scale: 1,
        stagger: 0.05,
        duration: DURATION / 3
      },
      '>-50%'
    )

    return timeline
  }, [])

  const resetAnimation = useCallback((killAndClear = false) => {
    if (!codeRef.current || !consoleRef.current) return

    const _timeline = timeline.current

    const codeSelector = gsap.utils.selector(codeRef.current.elm)
    const addPrintButton = codeSelector('#dev-tools-add-print')

    const tlChildren = _timeline.getChildren()

    tlChildren.forEach((child) => {
      const elms = child?.targets?.()
      clearProps(elms)
    })

    if (killAndClear) {
      _timeline.clear()
      _timeline.kill()
    }

    addPrintButton[0]?.classList?.remove?.('active')

    setCurrentHit(0)
    setMarkersType('transparent')
    setShowPrints(false)
  }, [])

  useEffect(() => {
    if (!codeRef.current || !consoleRef.current) return

    const _timeline = timeline.current

    const codeSelector = gsap.utils.selector(codeRef.current.elm)

    const addPrintButton = codeSelector('#dev-tools-add-print')
    const printPanel = codeSelector('#dev-tools-print-panel')
    const consoleMarkers = codeSelector('#dev-tools-console-markers')
    const yellowMarker = codeSelector(
      '#dev-tools-console-markers [data-marker="yellow"]'
    )

    _timeline.fromTo(
      addPrintButton,
      {
        x: -5,
        opacity: 0,
        scale: 0.8
      },
      {
        x: 0,
        opacity: 1,
        scale: 1
      }
    )

    _timeline.to(addPrintButton, {
      scale: 1.1,
      delay: 0.5,
      duration: DURATION / 3
    })

    _timeline.to(addPrintButton, {
      scale: 1,
      duration: DURATION / 3
    })

    _timeline.call(
      () => {
        addPrintButton[0]?.classList?.add?.('active')
        setShowPrints(true)
      },
      undefined,
      '>-50%'
    )

    _timeline.fromTo(
      printPanel,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0
      }
    )

    _timeline.call(
      () => {
        consoleMarkers[0]?.classList?.add?.('active')
      },
      undefined,
      '+=0.5'
    )

    _timeline.to(
      yellowMarker,
      {
        scale: 1.5,
        duration: DURATION / 3
      },
      '+=0.5'
    )

    _timeline.to(yellowMarker, {
      scale: 1,
      duration: DURATION / 3,
      clearProps: 'all'
    })

    const updateMarkersTimeline = updateMarkers('yellow', true)

    updateMarkersTimeline && _timeline.add(updateMarkersTimeline)

    _timeline.call(
      () => {
        consoleMarkers[0]?.classList?.remove?.('active')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        ;(codeRef.current?.timeline as UseGsapTimeAPI)?.start?.()
      },
      undefined,
      '+=0.5'
    )

    return () => {
      resetAnimation(true)
    }
  }, [updateMarkers, resetAnimation])

  return (
    <>
      <Code
        printPanelConfig={{
          print: '"rotation", angle',
          markers: printMarkers,
          currentHit: currentHit,
          currentMarker: markersType,
          onChangeMarker: updateMarkers,
          onHit: setCurrentHit,
          timelineType: 'timeBased',
          printLineTarget: 5
        }}
        onMouseEnter={pauseTimeline}
        onMouseLeave={resumeTimeline}
        printIndicators={{
          3: 'not-available',
          4: 'available',
          5: 'available'
        }}
        code={`

export function HoverBoard() {
  const [pos, setPos] = useState({left: 0, right: 0})
  const [angle, setAngle] = useState(0)
}





`}
        ref={codeRef}
      />

      <DevTools
        {...devtoolsProps}
        panel="console"
        panelProps={{
          disableTravel: true,
          currentHit,
          logs: fullLogs,
          // @ts-ignore
          ref: consoleRef
        }}
      />
    </>
  )
}

const START_OF_ROTATION = 65
const END_OF_ROTATION = 340

const variables = {
  rotate: [0, 45, 90, 120, 160, 360]
}

export const Scene2: FC<SceneProps> = ({
  pauseTimeline,
  resumeTimeline,
  devtoolsProps
}) => {
  const consoleRef = useRef<any>(null)
  const hoverboardRef = useRef<StoreRef>(null)
  const [currentHit, setCurrentHit] = useState(0)

  const timeline = useRef(gsap.timeline({ delay: 2 }))

  const hoverboardState = useRef({
    _rotate: 0,
    set rotate(v: number) {
      this._rotate = v
      hoverboardRef.current?.hoverboard?.flip(
        rangeMap(v, 0, 360, START_OF_ROTATION, END_OF_ROTATION)
      )
    },
    get rotate() {
      return this._rotate
    }
  })

  useEffect(() => {
    gsap.to(hoverboardState.current, {
      rotate: variables.rotate[currentHit],
      ease: 'linear'
    })
  }, [currentHit])

  const logs: ConsoleProps['logs'] = [
    {
      hits: variables.rotate.length,
      marker: 'unicorn',
      prepend: 'rotate',
      content: variables.rotate
    }
  ]

  useEffect(() => {
    if (!hoverboardRef.current || !consoleRef.current) return

    const _timeline = timeline.current

    const consoleSelector = gsap.utils.selector(consoleRef.current)

    const buttons = consoleSelector('#icon')
    const logLines = consoleSelector('#log-line')

    const setNewMarkerHit = (i: number) => {
      buttons[i].classList.remove('active')
      logLines[i].classList.remove('active')
      setCurrentHit(i)
    }

    _timeline.call(() => {
      logLines[2].classList.add('active')
    }, undefined)

    _timeline.call(
      () => {
        buttons[2].classList.add('active')
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        setNewMarkerHit(2)
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        logLines[5].classList.add('active')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        buttons[5].classList.add('active')
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        setNewMarkerHit(5)
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        logLines[0].classList.add('active')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        buttons[0].classList.add('active')
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        setNewMarkerHit(0)
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        _timeline?.restart()
      },
      undefined,
      '+=3'
    )
  }, [])

  return (
    <>
      <DevTools
        {...devtoolsProps}
        onMouseEnter={pauseTimeline}
        onMouseLeave={resumeTimeline}
        panel="console"
        panelProps={{
          currentHit,
          onCurrentHitChange: setCurrentHit,
          // @ts-ignore
          ref: consoleRef,
          logs
        }}
      />

      <OverboardStore
        inspectMode="html"
        mode="just-overboard"
        ref={hoverboardRef}
      />
    </>
  )
}

let overboardProgress = 0

export const Scene3: FC<SceneProps> = ({ devtoolsProps }) => {
  const devToolsRef = useRef(null)
  const storeRef = useRef(null)
  const overboardRef = useRef<StoreRef>(null)
  const [activeComponent, setActiveComponent] =
    useState<IdentifiedNode<ReactNode> | null>()
  const [hoveredComponentBlockId, setHoveredComponentBlockId] = useState<
    string | null
  >(null)
  const [overboardColor, setOverboardColor] = useState<OverboardColors>('red')
  const [rotation /* , setRotation */] = useState(0)

  const tree = useMemo<IdentifiedNode<ReactNode>>(() => {
    const tree = {
      type: 'App',
      inspectBlockId: 'app',
      children: [
        {
          type: 'Hoverboard',
          inspectBlockId: 'hoverboard',
          props: {
            rotation: rotation,
            isAnimated: true,
            velocity: 20,
            color: overboardColor
          }
        },
        {
          type: 'PurchaseForm',
          inspectBlockId: 'purchase-form',
          children: [
            {
              type: 'Colors',
              inspectBlockId: 'colors',
              props: {
                colors: ['red', 'green', 'blue']
              },
              children: [
                {
                  type: 'Color',
                  inspectBlockId: 'color-red',
                  props: {
                    key: 'red'
                  }
                },
                {
                  type: 'Color',
                  inspectBlockId: 'color-green',
                  props: {
                    key: 'green'
                  }
                },
                {
                  type: 'Color',
                  inspectBlockId: 'color-blue',
                  props: {
                    key: 'blue'
                  }
                }
              ]
            }
          ]
        }
      ]
    }

    const uuidsTree = buildUuids(tree)
    const identifiedTree = identifyNodes(uuidsTree)

    setActiveComponent((prev) =>
      prev?.path ? get(identifiedTree, prev?.path) : prev
    )

    return identifiedTree
  }, [overboardColor, rotation])

  const updateOverboard = useCallback(() => {
    overboardProgress += 1
    const loopedValue = overboardProgress % 360
    // const a = rangeMap(
    //   clamp(loopedValue, START_OF_ROTATION, END_OF_ROTATION),
    //   START_OF_ROTATION,
    //   END_OF_ROTATION,
    //   0,
    //   360
    // )

    // setRotation(Number(a.toFixed(0)))
    overboardRef.current?.hoverboard?.flip(loopedValue)
  }, [])

  const timeline = useRef(gsap.timeline({ delay: 2 }))

  const resetAnimation = () => {
    if (!overboardRef.current || !devToolsRef.current) return

    const _timeline = timeline.current

    const toolsSelector = gsap.utils.selector(devToolsRef.current)
    const nodeLine = toolsSelector('#node-line')

    nodeLine[6].classList.remove('active')

    setActiveComponent(null)
    setHoveredComponentBlockId(null)
    setOverboardColor('red')

    _timeline.clear()
    _timeline.kill()
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateOverboard()
    }, 1)

    return () => {
      clearInterval(intervalId)
    }
  }, [updateOverboard])

  useEffect(() => {
    if (!overboardRef.current || !devToolsRef.current) return

    const _timeline = timeline.current

    const toolsSelector = gsap.utils.selector(devToolsRef.current)
    const nodeLine = toolsSelector('#node-line')

    _timeline.call(() => {
      nodeLine[0].classList.add('hovered')
      setHoveredComponentBlockId('app')
    }, undefined)

    _timeline.call(
      () => {
        nodeLine[0].classList.remove('hovered')
        nodeLine[1].classList.add('hovered')
        setHoveredComponentBlockId('hoverboard')
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        setActiveComponent(get(tree, 'children.0'))
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        nodeLine[1].classList.remove('hovered')
        nodeLine[3].classList.add('hovered')
        setHoveredComponentBlockId('colors')
      },
      undefined,
      '+=0.8'
    )

    _timeline.call(
      () => {
        setActiveComponent(get(tree, 'children.1.children.0'))
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        nodeLine[3].classList.remove('hovered')
        nodeLine[4].classList.add('hovered')
        setHoveredComponentBlockId('color-red')
      },
      undefined,
      '+=0.8'
    )

    _timeline.call(
      () => {
        nodeLine[4].classList.remove('hovered')
        nodeLine[5].classList.add('hovered')
        setHoveredComponentBlockId('color-green')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        nodeLine[5].classList.remove('hovered')
        nodeLine[6].classList.add('hovered')
        setHoveredComponentBlockId('color-blue')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        nodeLine[6].classList.remove('hovered')
        setActiveComponent(get(tree, 'children.1.children.0.children.2'))
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        setOverboardColor('green')
      },
      undefined,
      '+=0.8'
    )

    _timeline.call(
      () => {
        setOverboardColor('blue')
      },
      undefined,
      '+=0.6'
    )

    _timeline.call(
      () => {
        resetAnimation()
        _timeline?.restart()
      },
      undefined,
      '+=3'
    )
  }, [tree])

  useInspectElement(hoveredComponentBlockId, storeRef.current)

  return (
    <>
      <DevTools
        {...devtoolsProps}
        panel="react"
        panelProps={{
          tree,
          activeComponent,
          onHoverComponent: setHoveredComponentBlockId,
          onActiveComponentChange: setActiveComponent,
          // @ts-ignore
          ref: devToolsRef
        }}
      />

      <div ref={storeRef}>
        <OverboardStore
          inspectMode="react"
          overboardColor={overboardColor}
          onOverboardColorChange={setOverboardColor}
          mode="color-picker"
          ref={overboardRef}
        />
      </div>
    </>
  )
}

export const Scene4: FC<SceneProps> = ({ devtoolsProps }) => {
  const devToolsRef = useRef(null)
  const storeRef = useRef(null)
  const overboardRef = useRef<StoreRef>(null)
  const [activeElement, setActiveElement] =
    useState<IdentifiedNode<HTMLNode> | null>(null)
  const [overboardColor, setOverboardColor] = useState<OverboardColors>('red')
  const [hoveredComponentBlockId, setHoveredComponentBlockId] = useState<
    string | null
  >(null)
  const timeline = useRef(gsap.timeline({ delay: 2 }))

  const tree = useMemo<IdentifiedNode<HTMLNode>>(() => {
    const tree: HTMLNode = {
      type: 'body',
      inspectBlockId: 'app',
      overrideStyles: {
        width: '100vw',
        height: '100vh'
      },
      children: [
        {
          type: 'main',
          inspectBlockId: 'main',

          children: [
            {
              type: 'div',
              inspectBlockId: 'hoverboard-container',
              overrideStyles: {
                width: '100%',
                height: '100%'
              },
              attributes: {
                class: 'hoverboard-container'
              },
              children: [
                {
                  type: 'svg',
                  inspectBlockId: 'hoverboard',
                  overrideStyles: {
                    '--elevation': 0,
                    width: '100%',
                    height: '100%'
                  },
                  attributes: {
                    class: 'hoverboard'
                  }
                }
              ]
            },
            {
              type: 'form',
              inspectBlockId: 'purchase-form',
              inspectInnerTarget: ':scope > div',
              stylesWhitelist: ['position'],
              attributes: {
                class: 'purchase-form'
              },
              children: ['red', 'green', 'blue'].map((name) => ({
                type: 'input',
                inspectBlockId: `color-${name}`,
                inspectInnerTarget: 'input',
                stylesWhitelist: ['--stop-1', '--stop-2', 'background-image'],
                attributes: {
                  type: 'radio'
                }
              }))
            }
          ]
        }
      ]
    }

    const uuidsTree = buildUuids(tree)
    const identifiedTree = identifyNodes(uuidsTree)

    setActiveElement((prev) =>
      prev?.path ? get(identifiedTree, prev?.path) : prev
    )

    return identifiedTree
  }, [])

  const resetAnimation = () => {
    if (!overboardRef.current || !devToolsRef.current) return

    const _timeline = timeline.current

    const toolsSelector = gsap.utils.selector(devToolsRef.current)
    const nodeLine = toolsSelector('#node-line')

    nodeLine[7].classList.remove('active')

    setHoveredComponentBlockId(null)
    setActiveElement(null)

    // _timeline.clear()
    _timeline.kill()
  }

  useEffect(() => {
    if (!overboardRef.current || !devToolsRef.current) return

    const _timeline = timeline.current
    const toolsSelector = gsap.utils.selector(devToolsRef.current)
    const nodeLine = toolsSelector('#node-line')

    _timeline.call(() => {
      nodeLine[0].classList.add('hovered')
      setHoveredComponentBlockId('app')
    }, undefined)

    _timeline.call(
      () => {
        nodeLine[0].classList.remove('hovered')
        nodeLine[2].classList.add('hovered')
        setHoveredComponentBlockId('hoverboard-container')
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        setActiveElement(get(tree, 'children.0.children.0'))
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        nodeLine[2].classList.remove('hovered')
        nodeLine[4].classList.add('hovered')
        setHoveredComponentBlockId('colors')
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        setActiveElement(get(tree, 'children.0.children.1'))
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        nodeLine[4].classList.remove('hovered')
        nodeLine[5].classList.add('hovered')
        setHoveredComponentBlockId('color-red')
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        nodeLine[5].classList.remove('hovered')
        nodeLine[6].classList.add('hovered')
        setHoveredComponentBlockId('color-green')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        nodeLine[6].classList.remove('hovered')
        nodeLine[7].classList.add('hovered')
        setHoveredComponentBlockId('color-blue')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        setActiveElement(get(tree, 'children.0.children.1.children.2'))
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        resetAnimation()
        _timeline?.restart()
      },
      undefined,
      '+=3'
    )
  }, [tree])

  useInspectElement(hoveredComponentBlockId, storeRef.current)

  return (
    <>
      <DevTools
        {...devtoolsProps}
        panel="elements"
        panelProps={{
          tree,
          activeElement,
          onHoverElement: setHoveredComponentBlockId,
          onActiveElementChange: setActiveElement,
          // @ts-ignore
          ref: devToolsRef
        }}
      />

      <div ref={storeRef}>
        <OverboardStore
          inspectMode="html"
          overboardColor={overboardColor}
          onOverboardColorChange={setOverboardColor}
          mode="color-picker"
          ref={overboardRef}
        />
      </div>
    </>
  )
}

export const Scene5: FC<SceneProps> = ({ devtoolsProps }) => {
  const devToolsRef = useRef(null)
  const storeRef = useRef(null)
  const overboardRef = useRef<StoreRef>(null)
  const [activeCallIdx, setActiveCallIdx] = useState<number>()
  const [storeState, setStoreState] =
    useState<OverboardStoreProps['state']>('idle')

  const initialCalls: NetworkCall[] = [
    {
      pending: false,
      status: 200,
      caller: 'fetchVariants',
      method: 'GET',
      url: 'overboard.replay.io/api/variants',
      response: {
        variants: ['red', 'green', 'blue']
      }
    },
    {
      pending: false,
      status: 200,
      caller: 'addToCart',
      method: 'POST',
      url: 'overboard.replay.io/api/addToCart',
      request: {
        variant: 'red',
        quantity: 1
      },
      response: {
        cartId: 'c9811cbd64b8'
      }
    }
  ]

  const [calls, setCalls] = useState(initialCalls)

  const handlePurchase = useCallback(() => {
    setStoreState('loading')

    let currCallIdx: number

    setCalls((prev) => {
      currCallIdx = prev.length

      return [
        ...prev,
        {
          pending: true,
          status: 500,
          caller: 'purchase',
          method: 'POST',
          url: 'overboard.replay.io/api/purchase',
          request: {
            cartId: 'c9811cbd64b8'
          },
          response: {
            message: 'Something went wrong'
          }
        }
      ]
    })

    gsap.delayedCall(1, () => {
      setCalls((prev) => {
        prev[currCallIdx].pending = false
        return prev
      })

      setActiveCallIdx(currCallIdx)

      setStoreState('error')
    })
  }, [])

  const timeline = useRef(gsap.timeline({ delay: 2 }))

  const resetAnimation = () => {
    if (!overboardRef.current || !devToolsRef.current) return

    const _timeline = timeline.current

    const toolsSelector = gsap.utils.selector(devToolsRef.current)
    const callLine = toolsSelector('#call-line')

    callLine[2].classList.remove('active')

    setStoreState('idle')
    setCalls(initialCalls)

    _timeline.clear()
    _timeline.kill()
  }

  useEffect(() => {
    if (!overboardRef.current || !devToolsRef.current) return

    const _timeline = timeline.current

    _timeline.call(() => {
      setActiveCallIdx(0)
    }, undefined)

    _timeline.call(
      () => {
        setActiveCallIdx(1)
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        handlePurchase()
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        resetAnimation()
        _timeline?.restart()
      },
      undefined,
      '+=3'
    )
  })

  return (
    <>
      <DevTools
        {...devtoolsProps}
        panel="network"
        panelProps={{
          calls,
          activeCallIdx,
          onActiveCallChange: setActiveCallIdx,
          // @ts-ignore
          ref: devToolsRef
        }}
      />

      <div ref={storeRef}>
        <OverboardStore
          onPurchase={handlePurchase}
          state={storeState}
          inspectMode="html"
          overboardColor="red"
          mode="purchase"
          ref={overboardRef}
        />
      </div>
    </>
  )
}

const buildScope = (
  snapshot: Snapshot,
  upperScope?: Snapshot['scope'],
  fallbackScope?: Snapshot['scope']
): Snapshot => {
  const currScope = {
    name: `${upperScope?.name ? `${upperScope?.name}>` : ''}${
      snapshot.scope?.name || fallbackScope?.name
    }`,
    type: snapshot.scope?.type || fallbackScope?.type
  }

  return {
    ...snapshot,
    scope: currScope,
    children: snapshot?.children?.map((child) =>
      buildScope(child, currScope, snapshot?.children?.[0].scope)
    )
  }
}

export const Scene6: FC<SceneProps> = ({ pauseTimeline, resumeTimeline }) => {
  const debuggerRef = useRef(null)

  const [activeDebugLine, setActiveDebugLine] = useState()
  const [activeSnapshotPath, setActiveSnapshotPath] = useState<string>('0')

  const snapshotTree = useMemo(() => {
    // ^ means prev most recent value
    const tree: Snapshot[] = [
      {
        line: 10,
        variables: {
          angle: '23deg',
          board: { pos: { left: 12, top: 23 }, angle: 23 }
        },
        scope: {
          name: 'Board',
          type: 'component'
        },
        children: [
          {
            line: 4,
            scope: {
              name: 'calculateBoardAngle',
              type: 'function'
            },
            variables: {
              angle: 23,
              board: '^'
            }
          },
          {
            line: 5,
            variables: {
              angle: '^'
            }
          }
        ]
      },
      {
        line: 11,
        variables: {
          angle: '^'
        }
      },
      {
        line: 10,
        variables: {
          angle: '45deg',
          board: { pos: { left: 15, top: 19 }, angle: 45 }
        },
        children: [
          {
            line: 4,
            scope: {
              name: 'calculateBoardAngle',
              type: 'function'
            },
            variables: {
              angle: 23,
              board: '^'
            }
          },
          {
            line: 5,
            variables: {
              angle: '^'
            }
          }
        ]
      },
      {
        line: 11,
        variables: {
          angle: '^'
        }
      },
      {
        line: 10,
        variables: {
          angle: '60deg',
          board: { pos: { left: 20, top: 14 }, angle: 60 }
        },
        children: [
          {
            line: 4,
            scope: {
              name: 'calculateBoardAngle',
              type: 'function'
            },
            variables: {
              angle: 23,
              board: '^'
            }
          },
          {
            line: 5,
            variables: {
              angle: '^'
            }
          }
        ]
      },
      {
        line: 11,
        variables: {
          angle: '^'
        }
      }
    ]

    const scopedTree = tree.map((snapshot) =>
      buildScope(snapshot, { name: 'React' }, tree[0].scope)
    )

    const identifiedTree = scopedTree.map((child, idx) =>
      identifyNodes(child, idx.toString())
    )

    return identifiedTree
  }, [])

  const breakpoints = useMemo(() => [10], [])

  useEffect(() => {
    const currentSnapshot = get(snapshotTree, activeSnapshotPath)

    setActiveDebugLine(currentSnapshot?.line)
  }, [activeSnapshotPath, snapshotTree])

  const timeline = useRef(gsap.timeline({ delay: 2 }))

  const resetAnimation = () => {
    if (!debuggerRef.current) return

    setActiveSnapshotPath('0')

    const _timeline = timeline.current

    _timeline.kill()
  }

  useEffect(() => {
    if (!debuggerRef.current) return
    const _timeline = timeline.current

    const debuggerSelector = gsap.utils.selector(debuggerRef.current)
    const prevBPButton = debuggerSelector('#prev-breakpoint')
    const nextBPButton = debuggerSelector('#next-breakpoint')
    // const prevFuncButton = debuggerSelector('#prev-function')
    const nextFuncButton = debuggerSelector('#next-function')
    // const exitButton = debuggerSelector('#exit-function')
    const enterButton = debuggerSelector('#enter-function')

    _timeline.call(() => {
      nextBPButton[0].classList.add('hovered')
    }, undefined)

    _timeline.call(
      () => {
        nextBPButton[0].classList.remove('hovered')
        setActiveSnapshotPath('2')
      },
      undefined,
      '+=0.2'
    )

    _timeline.call(
      () => {
        nextBPButton[0].classList.add('hovered')
      },
      undefined,
      '+=0.3'
    )

    _timeline.call(
      () => {
        nextBPButton[0].classList.remove('hovered')
        setActiveSnapshotPath('4')
      },
      undefined,
      '+=0.2'
    )

    _timeline.call(
      () => {
        prevBPButton[0].classList.add('hovered')
      },
      undefined,
      '+=0.3'
    )

    _timeline.call(
      () => {
        prevBPButton[0].classList.remove('hovered')
        setActiveSnapshotPath('2')
      },
      undefined,
      '+=0.2'
    )

    _timeline.call(
      () => {
        prevBPButton[0].classList.add('hovered')
      },
      undefined,
      '+=0.3'
    )

    _timeline.call(
      () => {
        prevBPButton[0].classList.remove('hovered')
        setActiveSnapshotPath('0')
      },
      undefined,
      '+=0.2'
    )

    _timeline.call(
      () => {
        nextFuncButton[0].classList.add('hovered')
      },
      undefined,
      '+=1'
    )

    _timeline.call(
      () => {
        nextFuncButton[0].classList.remove('hovered')
        setActiveSnapshotPath('1')
      },
      undefined,
      '+=0.2'
    )

    _timeline.call(
      () => {
        nextFuncButton[0].classList.add('hovered')
      },
      undefined,
      '+=0.3'
    )

    _timeline.call(
      () => {
        nextFuncButton[0].classList.remove('hovered')
        setActiveSnapshotPath('2')
      },
      undefined,
      '+=0.2'
    )

    _timeline.call(
      () => {
        enterButton[0].classList.add('hovered')
      },
      undefined,
      '+=0.65'
    )

    _timeline.call(
      () => {
        enterButton[0].classList.remove('hovered')
        setActiveSnapshotPath('2.children.0')
      },
      undefined,
      '+=0.2'
    )

    _timeline.call(
      () => {
        resetAnimation()
        _timeline?.restart()
      },
      undefined,
      '+=3'
    )
  }, [])

  return (
    <>
      <Debugger
        ref={debuggerRef}
        onMouseEnter={pauseTimeline}
        onMouseLeave={resumeTimeline}
        breakpoints={breakpoints}
        snapshotTree={snapshotTree}
        currentSnapshotPath={activeSnapshotPath}
        onCurrentSnapshotPathChange={setActiveSnapshotPath}
      />
      <Code
        debugLine={activeDebugLine}
        breakpoints={breakpoints}
        printIndicators={{
          3: 'not-available',
          4: 'available',
          5: 'available',
          9: 'not-available',
          10: 'available',
          11: 'available'
        }}
        code={`

export function calculateBoardAngle(board) {
  const { angle } = board;
  return \`\${angle}deg\`
}


export function Board({ board }) {
  const angle = calcuateBoardAngle(board)
  return <Svg type=”board” angle={angle} />
}

`}
      />
    </>
  )
}
