import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Mail, Bell, Clock, Shield, Palette, Globe } from "lucide-react";

export const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Configurações do Sistema
          </CardTitle>
          <CardDescription>
            Configure as preferências e parâmetros do sistema de agendamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="schedule">Horários</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
              <TabsTrigger value="appearance">Aparência</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Configurações Gerais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clinic-name">Nome da Clínica</Label>
                      <Input id="clinic-name" defaultValue="Clínica Saúde+" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinic-phone">Telefone Principal</Label>
                      <Input id="clinic-phone" defaultValue="(11) 3333-4444" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clinic-address">Endereço</Label>
                    <Textarea 
                      id="clinic-address" 
                      defaultValue="Rua das Flores, 123 - Centro - São Paulo/SP - CEP: 01234-567"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Fuso Horário</Label>
                      <Select defaultValue="america/sao_paulo">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america/sao_paulo">América/São Paulo</SelectItem>
                          <SelectItem value="america/rio_branco">América/Rio Branco</SelectItem>
                          <SelectItem value="america/manaus">América/Manaus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma</Label>
                      <Select defaultValue="pt-br">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Configurações de Horários
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-notice">Antecedência Mínima (horas)</Label>
                      <Input id="min-notice" type="number" defaultValue="2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-advance">Antecedência Máxima (dias)</Label>
                      <Input id="max-advance" type="number" defaultValue="30" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="slot-duration">Duração Padrão do Slot (min)</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="45">45 minutos</SelectItem>
                          <SelectItem value="60">60 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buffer-time">Tempo de Intervalo (min)</Label>
                      <Input id="buffer-time" type="number" defaultValue="10" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Configurações de Cancelamento</Label>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Permitir Auto-Cancelamento</Label>
                        <p className="text-xs text-muted-foreground">
                          Clientes podem cancelar agendamentos automaticamente
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cancel-limit">Prazo Limite para Cancelamento (horas)</Label>
                      <Input id="cancel-limit" type="number" defaultValue="4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Configurações de Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Confirmação de Agendamento</Label>
                        <p className="text-xs text-muted-foreground">
                          Enviar email/SMS quando agendamento for confirmado
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Lembrete 24h Antes</Label>
                        <p className="text-xs text-muted-foreground">
                          Lembrete automático 24 horas antes do agendamento
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Lembrete 2h Antes</Label>
                        <p className="text-xs text-muted-foreground">
                          Lembrete automático 2 horas antes do agendamento
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Notificar Cancelamentos</Label>
                        <p className="text-xs text-muted-foreground">
                          Notificar profissionais sobre cancelamentos
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-email">Email para Notificações</Label>
                    <Input 
                      id="notification-email" 
                      type="email" 
                      defaultValue="admin@clinicasaude.com" 
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Configurações de Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Autenticação de Dois Fatores</Label>
                        <p className="text-xs text-muted-foreground">
                          Exigir 2FA para acesso administrativo
                        </p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Log de Auditoria</Label>
                        <p className="text-xs text-muted-foreground">
                          Registrar todas as ações administrativas
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Logout Automático</Label>
                        <p className="text-xs text-muted-foreground">
                          Desconectar usuários inativos automaticamente
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Timeout de Sessão (minutos)</Label>
                      <Input id="session-timeout" type="number" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-attempts">Máx. Tentativas de Login</Label>
                      <Input id="max-attempts" type="number" defaultValue="3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Configurações de Aparência
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Cor Primária</Label>
                      <div className="flex gap-2">
                        <Input id="primary-color" defaultValue="#2563eb" />
                        <div className="w-10 h-10 rounded border bg-blue-600"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Cor Secundária</Label>
                      <div className="flex gap-2">
                        <Input id="secondary-color" defaultValue="#64748b" />
                        <div className="w-10 h-10 rounded border bg-slate-500"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo-url">URL do Logotipo</Label>
                    <Input id="logo-url" placeholder="https://example.com/logo.png" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">Modo Escuro Padrão</Label>
                      <p className="text-xs text-muted-foreground">
                        Iniciar sistema em modo escuro
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline">Cancelar</Button>
            <Button>Salvar Configurações</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};