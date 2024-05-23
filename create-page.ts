import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

// Função para converter uma string para kebab-case
const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

// // Função para converter uma string para PascalCase
const toPascalCase = (str: string): string => {
  return str.replace(/(^\w|-\w)/g, clearAndUpper).replace(/-/g, '')
}

// Função auxiliar para converter a primeira letra de uma palavra para maiúscula
const clearAndUpper = (text: string): string => {
  return text.replace(/-/, '').toUpperCase()
}

// // Obtém o diretório atual usando import.meta.url
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const createPage = (pageName: string) => {
  const kebabCaseName = toKebabCase(pageName)
  const pascalCaseName = toPascalCase(pageName)
  const directoryPath = join(__dirname, 'src', 'views', 'pages', kebabCaseName)

  // // Verifica se a pasta já existe
  if (existsSync(directoryPath)) {
    console.error(`A pasta ${directoryPath} já existe.`)
    return
  }

  // // Cria a pasta
  mkdirSync(directoryPath, { recursive: true })

  // Conteúdo dinâmico para index.tsx
  const indexContent = `
  import { Fragment } from 'react';
  import { Helmet } from 'react-helmet-async';

  import { use${pascalCaseName}Controller } from '@views/pages/${kebabCaseName}/use-${kebabCaseName}-controller';

  export function ${pascalCaseName}() {
    const controller = use${pascalCaseName}Controller();

    return (
      <Fragment>
        <Helmet title="${pascalCaseName}" />

        <div className="">
          <h1>${pascalCaseName}</h1>
        </div>
      </Fragment>
    );
  }
  `

  // Conteúdo dinâmico para use-controller.ts
  const controllerContent = `/* eslint-disable @typescript-eslint/no-unused-vars */

  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';

  const schema = z.object({});

  type FormData = z.infer<typeof schema>;

  export function use${pascalCaseName}Controller() {
    const {
      register,
      control,
      formState: { errors },
      handleSubmit: hookFormHandleSubmit,
    } = useForm<FormData>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
    });

    return {
      register,
      control,
      errors,
      hookFormHandleSubmit,
    };
  }
  `

  // Cria os arquivos com o conteúdo dinâmico
  writeFileSync(join(directoryPath, 'index.tsx'), indexContent)
  writeFileSync(
    join(directoryPath, `use-${kebabCaseName}-controller.ts`),
    controllerContent,
  )

  console.log(`Página ${pascalCaseName} criada com sucesso em ${directoryPath}`)

  // Atualiza o arquivo de rotas
  // const routerPath = join(__dirname, 'src', 'router', 'index.tsx')
  // const routerContent = readFileSync(routerPath, 'utf-8')

  // const newRouteImport = `import { ${pascalCaseName} } from '@views/pages/${kebabCaseName}';`
  // const newRoute = `<Route path="/${kebabCaseName}" element={<${pascalCaseName} />} />`

  // const updateRouterContent = (
  //   content: string,
  //   newImport: string,
  //   newRoute: string,
  // ): string => {
  //   const privateRoutesStart = '/* Private Routes Start */'
  //   const privateRoutesEnd = '/* Private Routes End */'

  //   const startIdx = content.indexOf(privateRoutesStart)
  //   const endIdx = content.indexOf(privateRoutesEnd, startIdx)

  //   if (startIdx === -1 || endIdx === -1) {
  //     throw new Error('Comentários de rotas privadas não encontrados.')
  //   }

  //   const beforeStart = content.slice(0, startIdx + privateRoutesStart.length)
  //   const afterEnd = content.slice(endIdx)
  //   const betweenComments = content.slice(
  //     startIdx + privateRoutesStart.length,
  //     endIdx,
  //   )

  //   const newContentBetweenComments = betweenComments.trim()
  //     ? betweenComments.trim() + '\n' + newImport
  //     : newImport

  //   let updatedContent = `${beforeStart}\n${newContentBetweenComments}\n${afterEnd}`

  //   const privateRouteStart = '/* Private Routes */'
  //   const privateRouteEnd = '/* Private Routes */'

  //   const routeStartIdx = updatedContent.indexOf(privateRouteStart)
  //   const routeEndIdx = updatedContent.indexOf(privateRouteEnd, routeStartIdx)

  //   if (routeStartIdx === -1 || routeEndIdx === -1) {
  //     throw new Error('Comentários de rotas privadas não encontrados.')
  //   }

  //   const routePlaceholder = '{/* AQUI */}'
  //   const placeholderIdx = updatedContent.indexOf(
  //     routePlaceholder,
  //     routeStartIdx,
  //   )

  //   if (placeholderIdx === -1) {
  //     throw new Error('Placeholder para nova rota não encontrado.')
  //   }

  //   const beforePlaceholder = updatedContent.slice(
  //     0,
  //     placeholderIdx + routePlaceholder.length,
  //   )
  //   const afterPlaceholder = updatedContent.slice(
  //     placeholderIdx + routePlaceholder.length,
  //   )

  //   updatedContent = `${beforePlaceholder}\n${newRoute}\n${afterPlaceholder}`

  //   return updatedContent
  // }

  // const updatedRouterContent = updateRouterContent(
  //   routerContent,
  //   newRouteImport,
  //   newRoute,
  // )

  // // Salvar o conteúdo atualizado de volta no arquivo
  // writeFileSync(routerPath, updatedRouterContent, 'utf-8')

  // console.log('Router atualizado com sucesso.')

  // Executa pnpm lint --fix
  try {
    execSync('pnpm lint --fix', { stdio: 'inherit' })
    console.log('Linting aplicado com sucesso.')
  } catch (error) {
    console.error('Erro ao executar pnpm lint --fix:', error)
  }
}

// Obtém o nome da página do argumento da linha de comando
const pageName = process.argv[2]

if (!pageName) {
  console.error('Por favor, forneça o nome da página.')
  process.exit(1)
}

createPage(pageName)
