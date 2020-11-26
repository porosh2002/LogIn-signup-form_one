import React from 'react'
import {EDIV,Modal,Cross} from '../../Styled'
import { VscChromeClose } from "react-icons/vsc";
export default function Error({message0,message1,onClick}) {
    return (
        <EDIV>
        <Modal className='modal-box ab-p-50'>
        <div>
        <Cross onClick={onClick}>
        <VscChromeClose />
        </Cross>
        </div>
        <p style={{width:"80%",fontSize:'1.4rem',textAlign:"center"}} className='ab-p-50 title-w'>{message0}<span className='color-oranged'>{message1}</span></p>
        </Modal>
    </EDIV>
    )
}