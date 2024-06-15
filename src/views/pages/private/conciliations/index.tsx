// import axios from 'axios'
import { Fragment, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ZodError, z } from 'zod'

import { httpClient } from '@app/services/http-client'
import { PageTitle } from '@views/components/page-title'
import { Button } from '@views/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@views/components/ui/card'

// import { useConciliationsController } from '@views/pages/private/conciliations/use-conciliations-controller'
import { ConciliationCard } from './components/card'


const fileSchema = z.object({
	type: z.string().regex(/\.ofx$/, {
		message: 'Invalid file type. Only .ofx files are allowed.',
	}),
})

export function Conciliations() {
	const [file, setFile] = useState<File | null>(null)
	const [error, setError] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files ? event.target.files[0] : null
		if (selectedFile) {
			try {
				fileSchema.parse({ type: selectedFile.name })
				setFile(selectedFile)
				setError(null)
			} catch (e) {
				if (e instanceof ZodError) {
					setError(e.errors[0].message)
				}
				setFile(null)
			}
		}
	}

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()

		if (!file) return

		const formData = new FormData()
		formData.append('file', file)
		console.log(file)

		try {
			const response = await httpClient.post('/conciliations', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			console.log('File uploaded successfully:', response.data)
		} catch (error) {
			console.error('Error uploading file:', error)
		}
	}

	const [selectedOption, setSelectedOption] = useState('income')

	function handleCheckboxChange(id: string) {
		setSelectedOption(id)
	}

	const options = [
		{ id: 'category', label: 'R$ 100,00 - Lançamento' },
		{ id: 'subcategory', label: 'R$ 80,00 - OFX' },
	]

	return (
		<Fragment>
			<Helmet title="Conciliações" />

			<PageTitle
				title="Conciliações"
				description="Resolva as conciliações de suas transações que estão pendentes de resolução."
			/>

			<div>
				<form onSubmit={handleSubmit} encType="multipart/form-data">
					<input
						type="file"
						accept=".ofx"
						onChange={handleFileChange}
						ref={fileInputRef}
						style={{ display: 'none' }}
					/>
					{error && <p style={{ color: 'red' }}>{error}</p>}
					<Button
						type="button"
						onClick={handleButtonClick}
						variant="outline"
						className="mr-4"
					>
						Arquivo OFX
					</Button>
					<Button type="submit" disabled={!file} variant="outline">
						Enviar arquivo
					</Button>
				</form>
			</div>

			<div className="mt-4 grid w-full grid-cols-3">
				<Card className="w-[350px]">
					<CardHeader>
						<CardTitle>MONEY PLUS SCM - 14/10/2023</CardTitle>
						<CardDescription>
							Débito no valor de R$ 100,00 na conta corrente,
							<span className="ml-1 text-red-600">
								R$ 20,00 a menos do que em seu lançamento.
							</span>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form>
							<ConciliationCard
								title="Escolha o lançamento correto"
								options={options}
								selectedOption={selectedOption}
								onOptionChange={handleCheckboxChange}
							/>
						</form>
					</CardContent>
				</Card>
			</div>
		</Fragment>
	)
}
