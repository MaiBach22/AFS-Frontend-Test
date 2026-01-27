import { createServer } from 'node:http'
import { createYoga, createSchema } from 'graphql-yoga'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const schemaPath = join(process.cwd(), 'server', 'schema.graphql')
const typeDefs = readFileSync(schemaPath, 'utf-8')

const accounts = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    id: '2',
    username: 'janedoe',
    email: 'jane.doe@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
  },
]

let clientCompanies = [
  {
    _id: 'cc1',
    id: '1',
    name: 'Acme Corporation',
    primaryContact: 'John Smith',
    status: 'active',
  },
  {
    _id: 'cc2',
    id: '2',
    name: 'Globex Corporation',
    primaryContact: 'Jane Johnson',
    status: 'active',
  },
  {
    _id: 'cc3',
    id: '3',
    name: 'Soylent Corp',
    primaryContact: 'Robert Brown',
    status: 'inactive',
  },
]

let trades = [
  {
    _id: 't1',
    id: '1',
    amount: 1000,
    clientCompanyId: '1',
    commodity: 'Wheat',
    complianceYear: 2023,
    counterparty: 'Grain Traders Inc',
    createdAt: '2023-01-15T10:30:00Z',
    createdById: '1',
    dealDate: '2023-01-15',
    deliveryDate: '2023-03-15',
    price: 7.25,
    type: 'purchase',
    updatedAt: '2023-01-15T10:30:00Z',
    updatedById: '1',
  },
  {
    _id: 't2',
    id: '2',
    amount: 500,
    clientCompanyId: '2',
    commodity: 'Corn',
    complianceYear: 2023,
    counterparty: 'Midwest Farms LLC',
    createdAt: '2023-02-10T14:45:00Z',
    createdById: '2',
    dealDate: '2023-02-10',
    deliveryDate: '2023-04-20',
    price: 6.5,
    type: 'sale',
    updatedAt: '2023-02-10T14:45:00Z',
    updatedById: '2',
  },

  {
    _id: 't3',
    id: '3',
    amount: 750,
    clientCompanyId: '1',
    commodity: 'Soybeans',
    complianceYear: 2023,
    counterparty: 'AgriCorp International',
    createdAt: '2023-02-18T09:15:00Z',
    createdById: '1',
    dealDate: '2023-02-18',
    deliveryDate: '2023-05-10',
    price: 14.75,
    type: 'purchase',
    updatedAt: '2023-02-18T09:15:00Z',
    updatedById: '1',
  },
  {
    _id: 't4',
    id: '4',
    amount: 1200,
    clientCompanyId: '3',
    commodity: 'Rice',
    complianceYear: 2023,
    counterparty: 'Eastern Rice Producers',
    createdAt: '2023-02-22T11:20:00Z',
    createdById: '2',
    dealDate: '2023-02-22',
    deliveryDate: '2023-06-15',
    price: 18.3,
    type: 'purchase',
    updatedAt: '2023-02-22T11:20:00Z',
    updatedById: '2',
  },
  {
    _id: 't5',
    id: '5',
    amount: 300,
    clientCompanyId: '2',
    commodity: 'Barley',
    complianceYear: 2023,
    counterparty: 'Northern Grains Co',
    createdAt: '2023-03-05T13:45:00Z',
    createdById: '1',
    dealDate: '2023-03-05',
    deliveryDate: '2023-07-10',
    price: 5.85,
    type: 'sale',
    updatedAt: '2023-03-05T13:45:00Z',
    updatedById: '1',
  },
  {
    _id: 't6',
    id: '6',
    amount: 850,
    clientCompanyId: '1',
    commodity: 'Wheat',
    complianceYear: 2023,
    counterparty: 'Global Wheat Traders',
    createdAt: '2023-03-12T10:10:00Z',
    createdById: '2',
    dealDate: '2023-03-12',
    deliveryDate: '2023-08-20',
    price: 7.5,
    type: 'purchase',
    updatedAt: '2023-03-12T10:10:00Z',
    updatedById: '2',
  },
  {
    _id: 't7',
    id: '7',
    amount: 600,
    clientCompanyId: '3',
    commodity: 'Corn',
    complianceYear: 2023,
    counterparty: 'Midwest Corn Exchange',
    createdAt: '2023-03-18T09:30:00Z',
    createdById: '1',
    dealDate: '2023-03-18',
    deliveryDate: '2023-09-05',
    price: 6.75,
    type: 'sale',
    updatedAt: '2023-03-18T09:30:00Z',
    updatedById: '1',
  },
  {
    _id: 't8',
    id: '8',
    amount: 1500,
    clientCompanyId: '2',
    commodity: 'Soybeans',
    complianceYear: 2023,
    counterparty: 'South American Imports',
    createdAt: '2023-04-02T14:20:00Z',
    createdById: '2',
    dealDate: '2023-04-02',
    deliveryDate: '2023-10-15',
    price: 15.25,
    type: 'purchase',
    updatedAt: '2023-04-02T14:20:00Z',
    updatedById: '2',
  },
  {
    _id: 't9',
    id: '9',
    amount: 400,
    clientCompanyId: '1',
    commodity: 'Oats',
    complianceYear: 2023,
    counterparty: 'Northern Oat Farms',
    createdAt: '2023-04-15T11:05:00Z',
    createdById: '1',
    dealDate: '2023-04-15',
    deliveryDate: '2023-11-10',
    price: 4.95,
    type: 'sale',
    updatedAt: '2023-04-15T11:05:00Z',
    updatedById: '1',
  },
  {
    _id: 't10',
    id: '10',
    amount: 950,
    clientCompanyId: '3',
    commodity: 'Wheat',
    complianceYear: 2023,
    counterparty: 'Eastern Wheat Cooperative',
    createdAt: '2023-04-28T15:30:00Z',
    createdById: '2',
    dealDate: '2023-04-28',
    deliveryDate: '2023-12-05',
    price: 7.8,
    type: 'purchase',
    updatedAt: '2023-04-28T15:30:00Z',
    updatedById: '2',
  },
  {
    _id: 't11',
    id: '11',
    amount: 700,
    clientCompanyId: '2',
    commodity: 'Rice',
    complianceYear: 2023,
    counterparty: 'Pacific Rice Exporters',
    createdAt: '2023-05-10T09:45:00Z',
    createdById: '1',
    dealDate: '2023-05-10',
    deliveryDate: '2024-01-15',
    price: 19.1,
    type: 'sale',
    updatedAt: '2023-05-10T09:45:00Z',
    updatedById: '1',
  },
  {
    _id: 't12',
    id: '12',
    amount: 1100,
    clientCompanyId: '1',
    commodity: 'Corn',
    complianceYear: 2023,
    counterparty: 'Central Valley Growers',
    createdAt: '2023-05-22T13:15:00Z',
    createdById: '2',
    dealDate: '2023-05-22',
    deliveryDate: '2024-02-10',
    price: 6.9,
    type: 'purchase',
    updatedAt: '2023-05-22T13:15:00Z',
    updatedById: '2',
  },
  {
    _id: 't13',
    id: '13',
    amount: 550,
    clientCompanyId: '3',
    commodity: 'Barley',
    complianceYear: 2023,
    counterparty: 'Mountain Barley Farms',
    createdAt: '2023-06-05T10:50:00Z',
    createdById: '1',
    dealDate: '2023-06-05',
    deliveryDate: '2024-03-15',
    price: 6.1,
    type: 'sale',
    updatedAt: '2023-06-05T10:50:00Z',
    updatedById: '1',
  },
  {
    _id: 't14',
    id: '14',
    amount: 1300,
    clientCompanyId: '2',
    commodity: 'Wheat',
    complianceYear: 2023,
    counterparty: 'Western Wheat Alliance',
    createdAt: '2023-06-18T14:40:00Z',
    createdById: '2',
    dealDate: '2023-06-18',
    deliveryDate: '2024-04-10',
    price: 7.95,
    type: 'purchase',
    updatedAt: '2023-06-18T14:40:00Z',
    updatedById: '2',
  },
  {
    _id: 't15',
    id: '15',
    amount: 800,
    clientCompanyId: '1',
    commodity: 'Soybeans',
    complianceYear: 2023,
    counterparty: 'Midwest Soy Processors',
    createdAt: '2023-07-02T11:25:00Z',
    createdById: '1',
    dealDate: '2023-07-02',
    deliveryDate: '2024-05-20',
    price: 15.75,
    type: 'sale',
    updatedAt: '2023-07-02T11:25:00Z',
    updatedById: '1',
  },
  {
    _id: 't16',
    id: '16',
    amount: 650,
    clientCompanyId: '3',
    commodity: 'Oats',
    complianceYear: 2023,
    counterparty: 'Northern Plains Cooperative',
    createdAt: '2023-07-15T09:10:00Z',
    createdById: '2',
    dealDate: '2023-07-15',
    deliveryDate: '2024-06-15',
    price: 5.2,
    type: 'purchase',
    updatedAt: '2023-07-15T09:10:00Z',
    updatedById: '2',
  },
  {
    _id: 't17',
    id: '17',
    amount: 900,
    clientCompanyId: '2',
    commodity: 'Rice',
    complianceYear: 2023,
    counterparty: 'Delta Rice Growers',
    createdAt: '2023-07-28T13:35:00Z',
    createdById: '1',
    dealDate: '2023-07-28',
    deliveryDate: '2024-07-10',
    price: 18.9,
    type: 'sale',
    updatedAt: '2023-07-28T13:35:00Z',
    updatedById: '1',
  },
]

const resolvers = {
  Query: {
    clientCompanies: () => clientCompanies,
    clientCompany: (_, { id }) => clientCompanies.find((company) => company.id === id),

    trades: () => trades,
    trade: (_, { id }) => trades.find((trade) => trade.id === id),
  },
  Mutation: {
    createClientCompany: (_, { input }) => {
      const newId = String(clientCompanies.length + 1)
      const newClientCompany = {
        _id: `cc${newId}`,
        id: newId,
        name: input.name,
        primaryContact: input.primaryContact || null,
        status: input.status,
      }
      clientCompanies.push(newClientCompany)
      return newClientCompany
    },
    updateClientCompany: (_, { id, input }) => {
      const companyIndex = clientCompanies.findIndex((company) => company.id === id)
      if (companyIndex === -1) throw new Error(`ClientCompany with id ${id} not found`)

      const updatedCompany = {
        ...clientCompanies[companyIndex],
        name: input.name,
        primaryContact:
          input.primaryContact !== undefined
            ? input.primaryContact
            : clientCompanies[companyIndex].primaryContact,
        status: input.status,
      }

      clientCompanies[companyIndex] = updatedCompany
      return updatedCompany
    },
    deleteClientCompany: (_, { id }) => {
      const companyIndex = clientCompanies.findIndex((company) => company.id === id)
      if (companyIndex === -1) return false

      const hasReferencingTrades = trades.some((trade) => trade.clientCompanyId === id)
      if (hasReferencingTrades) {
        throw new Error(
          `Cannot delete ClientCompany with id ${id} because it is referenced by one or more trades`,
        )
      }

      clientCompanies = clientCompanies.filter((company) => company.id !== id)
      return true
    },

    createTrade: (_, { input }) => {
      const clientCompany = clientCompanies.find((company) => company.id === input.clientCompanyId)
      if (!clientCompany) {
        throw new Error(`ClientCompany with id ${input.clientCompanyId} not found`)
      }

      const newId = String(trades.length + 1)
      const timestamp = new Date().toISOString()

      const createdById = '1'

      const newTrade = {
        _id: `t${newId}`,
        id: newId,
        amount: input.amount,
        clientCompanyId: input.clientCompanyId,
        commodity: input.commodity,
        complianceYear: input.complianceYear,
        counterparty: input.counterparty,
        createdAt: timestamp,
        createdById,
        dealDate: input.dealDate,
        deliveryDate: input.deliveryDate || null,
        price: input.price,
        type: input.type,
        updatedAt: timestamp,
        updatedById: createdById,
      }

      trades.push(newTrade)
      return newTrade
    },
    updateTrade: (_, { id, input }) => {
      const tradeIndex = trades.findIndex((trade) => trade.id === id)
      if (tradeIndex === -1) throw new Error(`Trade with id ${id} not found`)

      if (input.clientCompanyId) {
        const clientCompany = clientCompanies.find(
          (company) => company.id === input.clientCompanyId,
        )
        if (!clientCompany) {
          throw new Error(`ClientCompany with id ${input.clientCompanyId} not found`)
        }
      }

      const timestamp = new Date().toISOString()

      const updatedById = '2'

      const updatedTrade = {
        ...trades[tradeIndex],
        ...(input.amount !== undefined && { amount: input.amount }),
        ...(input.clientCompanyId !== undefined && { clientCompanyId: input.clientCompanyId }),
        ...(input.commodity !== undefined && { commodity: input.commodity }),
        ...(input.complianceYear !== undefined && { complianceYear: input.complianceYear }),
        ...(input.counterparty !== undefined && { counterparty: input.counterparty }),
        ...(input.dealDate !== undefined && { dealDate: input.dealDate }),
        ...(input.deliveryDate !== undefined && { deliveryDate: input.deliveryDate }),
        ...(input.price !== undefined && { price: input.price }),
        ...(input.type !== undefined && { type: input.type }),
        updatedAt: timestamp,
        updatedById,
      }

      trades[tradeIndex] = updatedTrade
      return updatedTrade
    },
    deleteTrade: (_, { id }) => {
      const tradeIndex = trades.findIndex((trade) => trade.id === id)
      if (tradeIndex === -1) return false

      trades = trades.filter((trade) => trade.id !== id)
      return true
    },
  },

  Trade: {
    clientCompany: (trade) => {
      return clientCompanies.find((company) => company.id === trade.clientCompanyId)
    },
    createdBy: (trade) => {
      return accounts.find((account) => account.id === trade.createdById)
    },
    updatedBy: (trade) => {
      return accounts.find((account) => account.id === trade.updatedById)
    },
  },
}

const schema = createSchema({
  typeDefs,
  resolvers,
})

const yoga = createYoga({ schema })

const server = createServer(yoga)

const startServer = (port: number) => {
  try {
    server.listen(port, () => {
      console.log(`🚀 GraphQL server is running on http://localhost:${port}/graphql`)
    })

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`⚠️ Port ${port} is already in use, trying port ${port + 1}...`)
        startServer(port + 1)
      } else {
        console.error('Server error:', err)
      }
    })
  } catch (error) {
    console.error('Failed to start server:', error)
  }
}

const PORT = 4000
startServer(PORT)
