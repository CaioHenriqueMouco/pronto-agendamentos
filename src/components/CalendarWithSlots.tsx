import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSlots, formatHora } from '@/hooks/useSlots';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CalendarWithSlotsProps {
  profissionalId: string;
  onBooked?: (agendamentoId: string) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
}

export function CalendarWithSlots({
  profissionalId,
  onBooked,
  minDate = new Date(),
  maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
  disabledDates = []
}: CalendarWithSlotsProps) {
  const { toast } = useToast();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { slots, isLoading: slotsLoading, invalidateSlots } = useSlots(
    profissionalId,
    selectedDate
  );

  // Calendar navigation
  const nextMonth = useCallback(() => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  }, [currentMonth]);

  const prevMonth = useCallback(() => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  }, [currentMonth]);

  // Generate calendar days
  const getDaysInMonth = useCallback(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday

    const days = [];
    for (let i = 0; i < 42; i++) { // 6 weeks * 7 days
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  }, [currentMonth]);

  const isDateDisabled = useCallback((date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today || date < minDate || date > maxDate) return true;
    
    return disabledDates.some(disabledDate => 
      disabledDate.toDateString() === date.toDateString()
    );
  }, [minDate, maxDate, disabledDates]);

  const handleDateSelect = useCallback((date: Date) => {
    if (isDateDisabled(date)) return;
    
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(dateStr);
    setSelectedSlot('');
    setBookingStatus('idle');
  }, [isDateDisabled]);

  const handleSlotSelect = useCallback((slotId: string) => {
    setSelectedSlot(slotId);
    setBookingStatus('idle');
  }, []);

  const handleBookAppointment = useCallback(async () => {
    if (!selectedSlot || !profissionalId) return;

    setIsBooking(true);
    setBookingStatus('idle');

    try {
      // First, create or get a guest client
      const guestClientData = {
        tenant_id: '550e8400-e29b-41d4-a716-446655440000', // Default tenant for demo
        nome: 'Cliente Convidado',
        email: 'guest@example.com',
        telefone: '',
        tipo: 'guest'
      };

      const { data: clientData, error: clientError } = await supabase
        .from('clientes')
        .insert(guestClientData)
        .select()
        .single();

      if (clientError) throw clientError;

      // Call the booking function
      const { data: bookingResult, error: bookingError } = await supabase
        .rpc('create_agendamento', {
          p_profissional_id: profissionalId,
          p_cliente_id: clientData.id,
          p_horario_id: selectedSlot
        });

      if (bookingError) throw bookingError;

      const result = bookingResult[0];
      
      if (result.success) {
        setBookingStatus('success');
        toast({
          title: "Agendamento confirmado!",
          description: result.message,
        });
        
        // Refresh slots
        invalidateSlots();
        
        // Reset selection
        setSelectedSlot('');
        
        // Call callback
        onBooked?.(result.agendamento_id);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      setBookingStatus('error');
      toast({
        title: "Erro no agendamento",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
        variant: "destructive"
      });
    } finally {
      setIsBooking(false);
    }
  }, [selectedSlot, profissionalId, invalidateSlots, onBooked, toast]);

  const days = getDaysInMonth();
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Selecione uma data
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevMonth}
                aria-label="Mês anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[150px] text-center">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
                aria-label="Próximo mês"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day headers */}
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {days.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
              const isSelected = selectedDate === day.toISOString().split('T')[0];
              const isDisabled = isDateDisabled(day);
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <Button
                  key={index}
                  variant={isSelected ? "default" : "ghost"}
                  className={`
                    h-10 p-2 text-sm
                    ${!isCurrentMonth ? 'text-muted-foreground opacity-50' : ''}
                    ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''}
                    ${isDisabled ? 'opacity-30 cursor-not-allowed' : ''}
                  `}
                  disabled={isDisabled}
                  onClick={() => handleDateSelect(day)}
                  aria-label={`Selecionar ${day.toLocaleDateString()}`}
                >
                  {day.getDate()}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horários disponíveis - {new Date(selectedDate + 'T00:00:00').toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {slotsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Carregando horários...</span>
              </div>
            ) : slots.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Não há horários disponíveis para esta data.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={selectedSlot === slot.id ? "default" : "outline"}
                    className="h-12 text-sm"
                    onClick={() => handleSlotSelect(slot.id)}
                    aria-label={`Selecionar horário ${formatHora(slot.hora)}`}
                  >
                    {formatHora(slot.hora)}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Booking Confirmation */}
      {selectedSlot && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Confirmar agendamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Data selecionada:</p>
              <p className="font-medium">
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString()} às{' '}
                {formatHora(slots.find(s => s.id === selectedSlot)?.hora || '')}
              </p>
            </div>

            {bookingStatus === 'success' && (
              <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Agendamento realizado com sucesso!
                </AlertDescription>
              </Alert>
            )}

            {bookingStatus === 'error' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Erro ao realizar agendamento. Tente novamente.
                </AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleBookAppointment}
              disabled={isBooking || bookingStatus === 'success'}
              className="w-full h-12"
              size="lg"
            >
              {isBooking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Confirmando...
                </>
              ) : bookingStatus === 'success' ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Agendado com sucesso!
                </>
              ) : (
                'Confirmar agendamento'
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}