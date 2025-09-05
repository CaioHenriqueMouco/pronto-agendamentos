import { CalendarWithSlots } from '@/components/CalendarWithSlots';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, CheckCircle, User } from 'lucide-react';

const Agendamento = () => {
  const handleBooked = (agendamentoId: string) => {
    console.log('Agendamento criado:', agendamentoId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Agendar Consulta</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecione uma data e horário disponível para sua consulta com o Dr. João Silva.
          </p>
        </div>

        {/* Professional Info */}
        <Card className="mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profissional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Dr. João Silva</h3>
                <p className="text-muted-foreground">Clínico Geral • Cardiologia</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Telefone:</strong> (11) 99999-9999
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Agendamento Fácil</h3>
              <p className="text-sm text-muted-foreground">
                Selecione a data e horário que melhor se adapta à sua agenda
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Horários Flexíveis</h3>
              <p className="text-sm text-muted-foreground">
                Diversos horários disponíveis durante a semana
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Confirmação Instantânea</h3>
              <p className="text-sm text-muted-foreground">
                Receba confirmação imediata do seu agendamento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Component */}
        <CalendarWithSlots
          profissionalId="550e8400-e29b-41d4-a716-446655440001"
          onBooked={handleBooked}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Agendamento;