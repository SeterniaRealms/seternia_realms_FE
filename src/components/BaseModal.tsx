"use client";
import classNames from 'classnames';
import React, { ReactNode, useRef } from 'react';
import { motion } from "framer-motion";
import Image from 'next/image';
import closeButton from '@/../public/components/closeModal.svg';
import questionButton from '@/../public/components/question.svg';

type IModalProps = {
  onClose: () => void;
  isOpen: boolean;
  children: ReactNode;
  bgColor?: string;
  wSize?: number;
  wHeight?: number;
};

export function BaseModal({ onClose, isOpen, children, bgColor, wSize, wHeight }: IModalProps) {
  const constraintsRef = useRef(null);

  return (
    <motion.div
      className={classNames("flex justify-center items-center", { 'hidden': !isOpen })}
      ref={constraintsRef}
    >
      <motion.div
        drag
        dragConstraints={constraintsRef}
        className="flex w-full justify-center bg-transparent items-center"
      >
        <article
          className={classNames(
            "flex flex-col p-4 border-2 border-gradient rounded-lg",
            bgColor ? bgColor : 'bg-main'
          )}
          style={{ width: wSize ? `${wSize}px` : 'auto', height: wHeight ? `${wHeight}px` : 'auto' }}
        >
          <header className='flex justify-between'>
            <button type='button'>
              <Image width={30} src={questionButton} alt='Question button' />
            </button>
            <button type='button' onClick={onClose}>
              <Image width={30} src={closeButton} alt='Close modal button' />
            </button>
          </header>
          {children}
          <footer></footer>
        </article>
      </motion.div>
    </motion.div>
  );
}
