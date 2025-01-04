"use client";
import { Button } from 'primereact/button';
import Image from "next/image";
import { FC } from "react";
import './not-found.css';

const Page404: FC = () => {
  return (
    <div className="root-container">
      <div className="error-text">
        Página não encontrada!
        <br /> 
        Desculpe, não encontramos a página que você está procurando.
        <br />
        <span className="bold">
          Talvez você tenha digitado errado o URL?
        </span>
        <br />
        <span>
          Certifique-se de verificar sua ortografia.
        </span>
      </div>

      <div className="error-code-container">
        <span className="error-code">404</span>
        <Image src="/404.png" alt="erro 404" width={120} height={220} />
      </div>

      <Button
        className="styled-button"
        label="Voltar"
        onClick={() => window.location.href = '/'}
      />
    </div>
  );
};

export default Page404;