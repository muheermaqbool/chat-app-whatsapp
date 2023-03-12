import React from 'react'

export default function Emojis() {
 let [emoji,setemoji]=useState(false)
  return (
    <div>
        <div className={emoji===true?`emojilistner`:""}></div>
    </div>
  )
}
