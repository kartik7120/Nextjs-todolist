import { Navbar, Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import styles from "../styles/navbar.module.css";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { Button, useTheme } from '@nextui-org/react';
import { HiMoon } from "react-icons/hi2";
import { Theme } from '@nextui-org/react';
import { BsSunFill } from "react-icons/bs";
import { useTheme as useNextTheme } from 'next-themes'
import { FcTodoList } from "react-icons/fc";

export default function Nav({ children }: { children?: React.ReactNode }) {
    const { type, isDark } = useTheme();
    const { setTheme } = useNextTheme();

    return <Navbar variant="floating" isBordered>
    <Navbar.Brand>
      <FcTodoList size={50} />
      <Text h2 size="$5xl">TodoList</Text>
    </Navbar.Brand>
    <Navbar.Content enableCursorHighlight activeColor="secondary" variant="highlight-rounded">
      <Navbar.Link isActive href="#">Features</Navbar.Link>
      <Navbar.Link href="#">Customers</Navbar.Link>
      <Navbar.Link href="#">Pricing</Navbar.Link>
      <Navbar.Link href="#">Company</Navbar.Link>
    </Navbar.Content>
    <Navbar.Content>
      <Button color="gradient" onClick={() => {
        if (isDark === true) {
          setTheme("light")
        }
        else
          setTheme("dark")
      }}>
        {isDark ? <BsSunFill /> : <HiMoon />}
      </Button>
    </Navbar.Content>
  </Navbar>
}