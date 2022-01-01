import React, { useRef, useEffect } from 'react'
import VexFlow from 'vexflow'

const VF = VexFlow.Flow
const { Formatter, Renderer, Stave, StaveNote } = VF

const clefWidth = 30;
const timeWidth = 30;

export function Score({
  staves = [],
  clef = 'treble',
  timeSignature = '4/4',
  width = 450,
  height = 150,
}) {
  const container = useRef()
  const rendererRef = useRef()

  useEffect(() => {

      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG
      )
    
    const renderer = rendererRef.current
    renderer.resize(width, height)
    const context = renderer.getContext()
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')
    const clefAndTimeWidth = (clef ? clefWidth : 0) + (timeSignature ? timeWidth : 0);
    const staveWidth = (width - clefAndTimeWidth) / staves.length

    let currX = 0
    staves.forEach((notes, i) => {
      const stave = new Stave(currX, 0, staveWidth)
      if (i === 0) {
        stave.setWidth(staveWidth + clefAndTimeWidth)
        clef && stave.addClef(clef);
        timeSignature && stave.addTimeSignature(timeSignature);
      }
      currX += stave.getWidth()
      stave.setContext(context).draw()

      const processedNotes = notes
        .map(note => (typeof note === 'string' ? { key: note } : note))
        .map(note =>
          Array.isArray(note) ? { key: note[0], duration: note[1] } : note
        )
        .map(({ key, ...rest }) =>
          typeof key === 'string'
            ? {
                key: key.includes('/') ? key : `${key[0]}/${key.slice(1)}`,
                ...rest,
              }
            : rest
        )
        .map(
          ({ key, keys, duration = 'q' }) =>
            new StaveNote({
              keys: key ? [key] : keys,
              duration: String(duration),
            })
        )
      Formatter.FormatAndDraw(context, stave, processedNotes, {
        auto_beam: true,
      })
    })

    return function cleanup() {
      if (container.current) {
          container.current.innerHTML = "";
      }
    };


  }, [staves])

  return <div ref={container} />
}
