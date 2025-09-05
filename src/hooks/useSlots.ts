import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TimeSlot {
  id: string;
  hora: string;
  data: string;
  disponivel: boolean;
  profissional_id: string;
}

export const useSlots = (profissionalId: string, date: string) => {
  const queryClient = useQueryClient();

  const {
    data: slots,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['slots', profissionalId, date],
    queryFn: async () => {
      if (!profissionalId || !date) return [];

      const { data, error } = await supabase
        .from('horarios_disponiveis')
        .select('*')
        .eq('profissional_id', profissionalId)
        .eq('data', date)
        .eq('disponivel', true)
        .order('hora');

      if (error) throw error;
      return data as TimeSlot[];
    },
    enabled: !!profissionalId && !!date,
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true,
  });

  const invalidateSlots = () => {
    queryClient.invalidateQueries({
      queryKey: ['slots', profissionalId, date]
    });
  };

  return {
    slots: slots || [],
    isLoading,
    error,
    refetch,
    invalidateSlots
  };
};

export const formatHora = (hora: string): string => {
  return hora.slice(0, 5); // Remove seconds if present (HH:MM:SS -> HH:MM)
};