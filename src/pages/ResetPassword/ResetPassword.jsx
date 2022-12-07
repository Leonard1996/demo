import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Input } from "antd";
import { Col, Row, Space } from 'antd';
import axios from "axios";
import {useRef} from 'react';
import { useNavigate } from "react-router-dom";

export default function ResetPassword(){
    const emailRef= useRef(null);
    const passwordRef= useRef(null);
    const confirmPasswordRef= useRef(null);
    const resetPasswordCodeRef= useRef(null);
    const navigate = useNavigate()
    const handleSubmit = async () => {
        if (
            passwordRef.current.input.value !== confirmPasswordRef.current.input.value
        ) alert("Password should be same and 8 characters or longer")
        try {
            await axios.post('/reset-password',{
                email:emailRef.current.input.value,
                password:passwordRef.current.input.value,
                confirmPassword:confirmPasswordRef.current.input.value,
                resetPasswordCode:resetPasswordCodeRef.current.input.value,
            })
            alert("Password reset successfully")
            navigate("/login")
        } catch (error) {
            alert("Could not reset password")
        }
    }
    return (
            <div style={{marginTop:"30vh"}}>

            <Row justify="center" align="middle">
            <Col span={8}/>
            <Col span={8}>
                <div style={{padding:'0.5rem'}}>
                <Input placeholder="Insert email" ref={emailRef}/>
                </div>
                </Col>
            <Col span={8}/>
            </Row>
  

            <Row justify="center" align="middle">
            <Col span={8}/>
            <Col span={8}>    <div style={{padding:'0.5rem'}}>
                <Input type="password" placeholder="Insert password" ref={passwordRef}/>  
                </div></Col>
            <Col span={8}/>
            </Row>

            <Row justify="center" align="middle">
            <Col span={8}/>
            <Col span={8}>    <div style={{padding:'0.5rem'}}>
                <Input type="password" placeholder="Confirm password"   ref={confirmPasswordRef}/>  
              
                </div></Col>
            <Col span={8}/>
            </Row>

            <Row justify="center" align="middle">
            <Col span={8}/>
            <Col span={8}>    <div style={{padding:'0.5rem'}}>
                <Input placeholder="Insert reset code from email"  ref={resetPasswordCodeRef}/>  
               
                </div></Col>
            <Col span={8}/>
            </Row>

            <div style={{padding:'0.5rem', textAlign:"center"}}>
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            </div>

    )
}