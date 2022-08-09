import { render, configure, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PasswordEntry from 'components/PasswordForm/PasswordForm'
import { errorMessage } from 'config/errors'

configure({testIdAttribute: 'id'})

describe("PasswordForm", () => {
    
    test("should display Password Form" ,() => {
        
        render(<PasswordEntry/>)
    
        expect(screen.getByTestId('passwordForm')).toBeInTheDocument()
        expect(screen.getByTestId('passwordSubmit')).toBeInTheDocument()
        expect(screen.getByTestId('password')).toBeInTheDocument()
        expect(screen.getByTestId('confirm')).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument()
    })

    test("should trigger password submission failed", async () => {

        render(<PasswordEntry/>)

        const passwordInput = screen.getByTestId('password')
        const submitButton = screen.getByRole('button', {name: 'Submit'})

        await userEvent.type(passwordInput, 'abc')
        await userEvent.click(submitButton)

        expect(screen.getByTestId('alert')).toBeInTheDocument()

    })

    test("should submit successfully!", async () => {
        render(<PasswordEntry/>)
        
        const passwordInput = screen.getByTestId('password')
        const confirmInput = screen.getByTestId('confirm')
        const submitButton = screen.getByRole('button', {name: 'Submit'})

        await userEvent.type(passwordInput, 'ABab12`')
        await userEvent.type(confirmInput, 'ABab12`')
        await userEvent.click(submitButton)

        expect(screen.getByTestId('modal')).toBeInTheDocument()

        const okButton = screen.getByRole('button', {name: 'OK'})

        await userEvent.click(okButton)

        expect(screen.queryByTestId('modal')).toBeNull()
    })

    test("should display confirm not matching", async () => {
        render(<PasswordEntry/>)

        const passwordInput = screen.getByTestId('password')
        const confirmInput = screen.getByTestId('confirm')
        const submitButton = screen.getByRole('button', {name: 'Submit'})

        await userEvent.type(passwordInput, 'ABab12`')
        await userEvent.type(confirmInput, 'ABab')
        await userEvent.click(submitButton)

        expect(screen.getByText(errorMessage['confirm'])).toBeInTheDocument()
    })
})