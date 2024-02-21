import React from 'react';
import "./Doacao.css"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import { type BaseError, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import AuthProvider from '../AuthProvider/AuthProvider';

const Doacao = () => {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction
  } = useSendTransaction()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = "0x2fea417cc15Fb0D8E84436Fd76f7Cb2DC0644f3b"
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <AuthProvider>
      <div className="colunaGeralDoacao">
        <div className="centerConnectButtonDoacao">

        </div>
        <div className="container d-flex align-items-center justify-content-center">
          <div className="cardVendedor">
            <div className="card-body">
              <h2 className='text-center mb-4'>DOAÇÃO</h2>

              <form onSubmit={submit} className="formulario">
                <div className="colunaCentral">
                  <div className="mb-3">
                    <label>Valor</label>
                    <div className="row">
                      <div className="col-md-12">
                        <input name="value" placeholder="0.05" className="form-control" required />
                      </div>
                    </div>
                  </div>

                  <button disabled={isPending} type="submit" className='ButtonSend'>{isPending ? 'Confirming...' : 'Send'}</button>
                </div>
                {hash && <div>TRANSACTION HASH: {hash}</div>}
                {isConfirming && <div>Waiting for confirmation...</div>}
                {isConfirmed && <div>Transaction confirmed.</div>}
                {error && (<div>Error: {(error as BaseError).shortMessage || error.message}</div>)}
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Doacao;