import { HoverboardControls } from '@replayio/overboard'
import clamp from 'lodash/clamp'
import get from 'lodash/get'
import {
  ComponentRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { clearProps, DURATION, gsap } from '~/lib/gsap'
import { rangeMap } from '~/lib/utils'

import { Code, Debugger, DevTools, NewOverboardStore } from '../overboard-story'
import { CodeLine } from '../overboard-story/code'
import {
  HTMLNode,
  IdentifiedNode,
  identifyNodes,
  ReactNode
} from '../overboard-story/common'
import { Snapshot } from '../overboard-story/debugger'
import { NetworkCall } from '../overboard-story/devtools/network'
import {
  OverboardColors,
  OverboardStoreProps
} from '../overboard-story/overboard-store'

export const Scene1 = () => {
  const [markersType, setMarkersType] = useState('transparent')
  const [showPrints, setShowPrints] = useState(false)
  const codeRef = useRef<ComponentRef<typeof Code>>(null)
  const consoleRef = useRef()
  const timeline = useRef(gsap.timeline())
  const [currentHit, setCurrentHit] = useState(0)

  const fullLogs = [
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

    addPrintButton[0].classList.remove('active')

    setCurrentHit(0)
    setMarkersType('transparent')
    setShowPrints(false)
  }, [])

  const handleComplete = useCallback(() => {
    gsap.delayedCall(3, () => {
      resetAnimation()
      codeRef.current?.timeline?.reset()
      timeline.current.restart()
    })
  }, [resetAnimation])

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
        addPrintButton[0].classList.add('active')
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
        consoleMarkers[0].classList.add('active')
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
        consoleMarkers[0].classList.remove('active')
      },
      undefined,
      '+=0.5'
    )

    _timeline.call(
      () => {
        codeRef.current?.timeline?.start?.()
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
        currentHit={currentHit}
        currentMarker={markersType}
        onChangeMarker={updateMarkers}
        onComplete={handleComplete}
        onHit={setCurrentHit}
        ref={codeRef}
      />

      <DevTools
        panel="console"
        panelProps={{
          disableTravel: true,
          currentHit,
          logs: fullLogs,
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

export const Scene2 = () => {
  const hoverboardRef = useRef<HoverboardControls>(null)
  const [currentHit, setCurrentHit] = useState(0)
  const hoverboardState = useRef({
    _rotate: 0,
    set rotate(v: number) {
      this._rotate = v
      hoverboardRef.current?.rotate(
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

  const logs = [
    {
      hits: variables.rotate.length,
      marker: 'unicorn',
      prepend: 'rotate',
      content: variables.rotate
    }
  ]

  return (
    <>
      <DevTools
        panel="console"
        panelProps={{ currentHit, onCurrentHitChange: setCurrentHit, logs }}
      />

      <NewOverboardStore
        inspectMode="html"
        mode="just-overboard"
        ref={hoverboardRef}
      />
    </>
  )
}

let overboardProgress = 0

export function buildUuids(node: ReactNode, key?: string | number): ReactNode {
  return {
    ...node,
    uuid: node.type + (key != undefined ? `-${key}` : ''),
    children: node?.children?.map((child, idx) =>
      buildUuids(child, (key != undefined ? `${key}-` : '') + idx)
    )
  }
}

export const Scene3 = () => {
  const devToolsRef = useRef(null)
  const storeRef = useRef(null)
  const overboardRef = useRef<HoverboardControls>(null)
  const [activeComponent, setActiveComponent] =
    useState<IdentifiedNode<ReactNode> | null>()
  const [hoveredComponentBlockId, setHoveredComponentBlockId] = useState<
    string | null
  >(null)
  const [overboardColor, setOverboardColor] = useState<OverboardColors>('red')
  const [rotation, setRotation] = useState(0)

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

  console.log(tree)

  const updateOverboard = useCallback(() => {
    overboardProgress += 1
    const loopedValue = overboardProgress % 360
    const a = rangeMap(
      clamp(loopedValue, START_OF_ROTATION, END_OF_ROTATION),
      START_OF_ROTATION,
      END_OF_ROTATION,
      0,
      360
    )

    setRotation(Number(a.toFixed(0)))
    overboardRef.current?.rotate(loopedValue)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateOverboard()
    }, 1)

    return () => {
      clearInterval(intervalId)
    }
  }, [updateOverboard])

  useEffect(() => {
    if (!storeRef.current) return

    const storeSelector = gsap.utils.selector(storeRef.current)

    const targetInspect = storeSelector(
      `*[data-box-id='${hoveredComponentBlockId}']`
    )

    gsap.set(targetInspect, {
      '--inspect': 1
    })

    return () => {
      gsap.set(targetInspect, {
        '--inspect': 0
      })
    }
  }, [hoveredComponentBlockId])

  return (
    <>
      <DevTools
        panel="react"
        panelProps={{
          tree,
          activeComponent,
          onHoverComponent: setHoveredComponentBlockId,
          onActiveComponentChange: setActiveComponent,
          ref: devToolsRef
        }}
      />

      <div ref={storeRef}>
        <NewOverboardStore
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

export const Scene4 = () => {
  const devToolsRef = useRef(null)
  const storeRef = useRef(null)
  const overboardRef = useRef<HoverboardControls>(null)
  const [activeElement, setActiveElement] =
    useState<IdentifiedNode<HTMLNode> | null>()
  const [overboardColor, setOverboardColor] = useState<OverboardColors>('red')
  const [hoveredComponentBlockId, setHoveredComponentBlockId] = useState<
    string | null
  >(null)

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

    const identifiedTree = identifyNodes(tree)

    setActiveElement((prev) =>
      prev?.path ? get(identifiedTree, prev?.path) : prev
    )

    return identifiedTree
  }, [])

  useEffect(() => {
    if (!storeRef.current) return

    const storeSelector = gsap.utils.selector(storeRef.current)

    const targetInspect = storeSelector(
      `*[data-box-id='${hoveredComponentBlockId}']`
    )

    gsap.set(targetInspect, {
      '--inspect': 1
    })

    return () => {
      gsap.set(targetInspect, {
        '--inspect': 0
      })
    }
  }, [hoveredComponentBlockId])

  return (
    <>
      <DevTools
        panel="elements"
        panelProps={{
          tree,
          activeElement,
          onHoverElement: setHoveredComponentBlockId,
          onActiveElementChange: setActiveElement,
          ref: devToolsRef
        }}
      />

      <div ref={storeRef}>
        <NewOverboardStore
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

export const Scene5 = () => {
  const devToolsRef = useRef(null)
  const storeRef = useRef(null)
  const overboardRef = useRef<HoverboardControls>(null)
  const [activeCallIdx, setActiveCallIdx] = useState<number>()
  const [storeState, setStoreState] =
    useState<OverboardStoreProps['state']>('idle')
  const [calls, setCalls] = useState<NetworkCall[]>([
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
  ])

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

  return (
    <>
      <DevTools
        panel="network"
        panelProps={{
          calls,
          activeCallIdx,
          onActiveCallChange: setActiveCallIdx,
          ref: devToolsRef
        }}
      />

      <div ref={storeRef}>
        <NewOverboardStore
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

export const Scene6 = () => {
  const [activeDebugLine, setActiveDebugLine] = useState()
  const [activeSnapshotPath, setActiveSnapshotPath] = useState<string>('0')

  const code: CodeLine[] = useMemo(
    () => [
      { content: <></> },
      { content: <></> },
      {
        print: 'not-available',
        content: (
          <>
            <span className="reserved">export</span>{' '}
            <span className="reserved">function</span>{' '}
            <span className="declaration">calculateBoardAngle</span>(
            <span className="variable">board</span>) {'{'}
          </>
        )
      },
      {
        print: 'available',
        content: (
          <>
            &nbsp;&nbsp;
            <span className="reserved">const </span>
            {'{ '}
            <span className="variable">angle</span>
            {' } = '}
            <span className="variable">board</span>;
          </>
        )
      },
      {
        print: 'available',
        content: (
          <>
            &nbsp;&nbsp;
            <span className="reserved">return </span>
            <span className="string">`${'{'}</span>
            <span className="variable">angle</span>
            <span className="string">{'}'}`</span>;
          </>
        )
      },
      {
        print: 'not-available',
        content: <>{'}'}</>
      },
      { content: <></> },
      { content: <></> },
      {
        print: 'not-available',
        content: (
          <>
            <span className="reserved">export</span>{' '}
            <span className="reserved">function</span>{' '}
            <span className="declaration">Board</span>({'{ '}
            <span className="variable">board</span>
            {' }'}) {'{'}
          </>
        )
      },
      {
        print: 'available',
        content: (
          <>
            &nbsp;&nbsp;
            <span className="reserved">const </span>
            <span className="variable">angle</span>
            {' = '}
            <span className="declaration">calculateBoardAngle</span>(
            <span className="variable">board</span>);
          </>
        )
      },
      {
        print: 'available',
        content: (
          <>
            &nbsp;&nbsp;
            <span className="reserved">return</span>
            {' <'}
            <span className="variable">Svg</span>
            <span className="declaration"> type</span>=
            <span className="string">"board"</span>
            <span className="declaration"> angle</span>={'{'}
            <span className="variable">angle</span>
            {'} />'}
          </>
        )
      },
      {
        print: 'not-available',
        content: <>{'}'}</>
      },
      { content: <></> },
      { content: <></> }
    ],
    []
  )

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

  useEffect(() => {
    const currentSnapshot = get(snapshotTree, activeSnapshotPath)

    setActiveDebugLine(currentSnapshot?.line)
  }, [activeSnapshotPath, snapshotTree])

  return (
    <>
      <Debugger
        snapshotTree={snapshotTree}
        currentSnapshotPath={activeSnapshotPath}
        onCurrentSnapshotPathChange={setActiveSnapshotPath}
      />
      <Code debugLine={activeDebugLine} code={code} />
    </>
  )
}