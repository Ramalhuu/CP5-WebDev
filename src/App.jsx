import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Search, Loader2, User, MapPin, Heart, Skull, HelpCircle } from 'lucide-react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const searchCharacters = async () => {
    if (!searchTerm.trim()) return

    setLoading(true)
    setError(null)
    setCharacters([])
    setSelectedCharacter(null)

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchTerm)}`
      )
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Nenhum personagem encontrado com esse nome.')
        } else {
          setError('Erro ao buscar personagens. Tente novamente.')
        }
        setLoading(false)
        return
      }

      const data = await response.json()
      setCharacters(data.results)
    } catch (err) {
      setError('Erro de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchCharacters()
    }
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return <Heart className="w-4 h-4 text-green-500" />
      case 'dead':
        return <Skull className="w-4 h-4 text-red-500" />
      default:
        return <HelpCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'dead':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Rick and Morty
          </h1>
          <p className="text-center text-gray-600 mt-2">Busque seus personagens favoritos da série</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <Card className="shadow-lg border-2 border-purple-100">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Digite o nome do personagem..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 h-12 text-lg border-2 focus:border-purple-400 transition-colors"
                  />
                </div>
                <Button 
                  onClick={searchCharacters} 
                  disabled={loading || !searchTerm.trim()}
                  className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Buscar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Results Grid */}
        {characters.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {characters.length} personagem{characters.length > 1 ? 's' : ''} encontrado{characters.length > 1 ? 's' : ''}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((character) => (
                <Card 
                  key={character.id} 
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border-2 hover:border-purple-300"
                  onClick={() => setSelectedCharacter(character)}
                >
                  <div className="relative">
                    <img 
                      src={character.image} 
                      alt={character.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={`${getStatusColor(character.status)} border-2 flex items-center gap-1 px-3 py-1`}>
                        {getStatusIcon(character.status)}
                        {character.status}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl truncate">{character.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <User className="w-4 h-4" />
                      {character.species} • {character.gender}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{character.location.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Character Detail Modal */}
        {selectedCharacter && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCharacter(null)}
          >
            <Card 
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedCharacter.image} 
                  alt={selectedCharacter.name}
                  className="w-full h-80 object-cover"
                />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 rounded-full"
                  onClick={() => setSelectedCharacter(null)}
                >
                  ✕
                </Button>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{selectedCharacter.name}</CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className={`${getStatusColor(selectedCharacter.status)} border-2 flex items-center gap-1`}>
                        {getStatusIcon(selectedCharacter.status)}
                        {selectedCharacter.status}
                      </Badge>
                      <Badge variant="outline">{selectedCharacter.species}</Badge>
                      <Badge variant="outline">{selectedCharacter.gender}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedCharacter.type && (
                  <div>
                    <h3 className="font-semibold text-sm text-gray-500 mb-1">Tipo</h3>
                    <p className="text-lg">{selectedCharacter.type}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 mb-1">Origem</h3>
                  <p className="text-lg">{selectedCharacter.origin.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 mb-1">Última localização conhecida</h3>
                  <p className="text-lg">{selectedCharacter.location.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-500 mb-1">Aparições</h3>
                  <p className="text-lg">{selectedCharacter.episode.length} episódio{selectedCharacter.episode.length > 1 ? 's' : ''}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 bg-white/80 backdrop-blur-sm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>Dados fornecidos pela <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-semibold">Rick and Morty API</a></p>
          <p className="mt-2 text-sm">Projeto desenvolvido para fins educacionais</p>
        </div>
      </footer>
    </div>
  )
}

export default App

