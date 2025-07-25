import React, { useState, useRef } from 'react';
import { Upload, FileText, Mail, Settings, Users, Download, Send, Eye, AlertCircle, CheckCircle, Clock, Trash2, Plus, Edit3, HelpCircle, BookOpen } from 'lucide-react';

const CertificateManager = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [participants, setParticipants] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [emailConfig, setEmailConfig] = useState({
    subject: 'Certificado do «Nome do Evento»',
    bodyTemplate: ''
  });
  const [processingStatus, setProcessingStatus] = useState({
    isProcessing: false,
    progress: 0,
    currentStep: '',
    completed: 0,
    total: 0
  });
  const [generatedCertificates, setGeneratedCertificates] = useState([]);
  const fileInputRef = useRef(null);

  // Simulação de dados iniciais
  React.useEffect(() => {
    setTemplates([
      { id: 1, name: 'Participação', path: '/templates/participacao.docx', preview: 'Certificado de Participação' },
      { id: 2, name: 'Apresentação', path: '/templates/apresentacao.docx', preview: 'Certificado de Apresentação' },
      { id: 3, name: 'Workshop', path: '/templates/workshop.docx', preview: 'Certificado de Workshop' }
    ]);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      // Simular processamento do CSV
      const mockParticipants = [
        {
          id: 1,
          nome: 'João Silva',
          email: 'joao@exemplo.com',
          tipoCertificado: 'Participação',
          tituloComunicacao: 'Inovação Digital',
          tituloWorkshop: 'Tecnologias Emergentes',
          nomeEvento: 'Conferência Tech 2024',
          dataEvento: '15/03/2024',
          funcaoConferencia: 'Participante'
        },
        {
          id: 2,
          nome: 'Maria Santos',
          email: 'maria@exemplo.com',
          tipoCertificado: 'Apresentação',
          tituloComunicacao: 'IA na Educação',
          tituloWorkshop: '',
          nomeEvento: 'Conferência Tech 2024',
          dataEvento: '15/03/2024',
          funcaoConferencia: 'Palestrante'
        }
      ];
      setParticipants(mockParticipants);
    }
  };

  const simulateProcessing = async () => {
    setProcessingStatus({
      isProcessing: true,
      progress: 0,
      currentStep: 'Validando dados...',
      completed: 0,
      total: participants.length
    });

    const steps = [
      'Validando dados...',
      'Carregando templates...',
      'Gerando certificados...',
      'Preparando emails...',
      'Enviando certificados...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setProcessingStatus(prev => ({
        ...prev,
        currentStep: steps[i],
        progress: ((i + 1) / steps.length) * 100
      }));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Simular certificados gerados
    const mockGenerated = participants.map(p => ({
      id: p.id,
      name: p.nome,
      email: p.email,
      certificateType: p.tipoCertificado,
      status: 'sent',
      sentAt: new Date().toLocaleString('pt-PT')
    }));

    setGeneratedCertificates(mockGenerated);
    setProcessingStatus({
      isProcessing: false,
      progress: 100,
      currentStep: 'Concluído!',
      completed: participants.length,
      total: participants.length
    });
  };

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-gray-200'
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  const DashboardTab = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Sistema de Certificados</h2>
        <p className="text-blue-100 text-lg">Geração e envio automático de certificados personalizados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-blue-600" size={24} />
            <span className="text-2xl font-bold text-gray-900">{participants.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Participantes</h3>
          <p className="text-gray-600 text-sm">Total de destinatários carregados</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <FileText className="text-green-600" size={24} />
            <span className="text-2xl font-bold text-gray-900">{templates.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Templates</h3>
          <p className="text-gray-600 text-sm">Modelos de certificados disponíveis</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Mail className="text-purple-600" size={24} />
            <span className="text-2xl font-bold text-gray-900">{generatedCertificates.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Enviados</h3>
          <p className="text-gray-600 text-sm">Certificados processados hoje</p>
        </div>
      </div>

      {participants.length > 0 && !processingStatus.isProcessing && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="flex gap-4">
            <button
              onClick={simulateProcessing}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Send size={20} />
              Gerar e Enviar Certificados
            </button>
            <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              <Eye size={20} />
              Pré-visualizar
            </button>
          </div>
        </div>
      )}

      {processingStatus.isProcessing && (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="text-blue-600" size={24} />
            Processamento em Curso
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{processingStatus.currentStep}</span>
              <span>{Math.round(processingStatus.progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${processingStatus.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {processingStatus.completed} de {processingStatus.total} certificados processados
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const ParticipantsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Gestão de Participantes</h2>
        <div className="flex gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload size={20} />
            Carregar CSV
          </button>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Plus size={20} />
            Adicionar Manual
          </button>
        </div>
      </div>

      {participants.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
          <Upload className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum participante carregado</h3>
          <p className="text-gray-600 mb-6">Carregue um ficheiro CSV com os dados dos participantes para começar</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Carregar Ficheiro CSV
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Lista de Participantes ({participants.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tipo Certificado</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Função</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {participants.map((participant) => (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{participant.nome}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{participant.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {participant.tipoCertificado}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{participant.funcaoConferencia}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit3 size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const TemplatesTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Templates de Certificados</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          Novo Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
              <FileText className="text-blue-600 mb-4" size={32} />
              <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-gray-600 text-sm">{template.preview}</p>
            </div>
            <div className="p-4 bg-white">
              <div className="flex gap-2">
                <button className="flex-1 text-blue-600 border border-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  <Eye size={16} className="inline mr-1" />
                  Pré-visualizar
                </button>
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Edit3 size={16} className="inline mr-1" />
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const EmailConfigTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Configuração de Email</h2>
      
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Definições do Email</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assunto do Email
            </label>
            <input
              type="text"
              value={emailConfig.subject}
              onChange={(e) => setEmailConfig(prev => ({ ...prev, subject: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Certificado do «Nome do Evento»"
            />
            <p className="text-sm text-gray-500 mt-1">
              Use «Nome do Evento» para personalização automática
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Corpo do Email (Template)
            </label>
            <textarea
              value={emailConfig.bodyTemplate}
              onChange={(e) => setEmailConfig(prev => ({ ...prev, bodyTemplate: e.target.value }))}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Caro(a) «Nome»,&#10;&#10;Em anexo segue o seu certificado referente ao «Nome do Evento».&#10;&#10;Cumprimentos,&#10;Equipa Organizadora"
            />
            <p className="text-sm text-gray-500 mt-1">
              Use «Nome» e «Nome do Evento» para personalização
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Guardar Configurações
          </button>
        </div>
      </div>
    </div>
  );

  const HistoryTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Histórico de Envios</h2>
      
      {generatedCertificates.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-200 shadow-sm text-center">
          <Mail className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum envio realizado</h3>
          <p className="text-gray-600">Os certificados enviados aparecerão aqui</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Certificados Enviados ({generatedCertificates.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Tipo</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Enviado em</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {generatedCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{cert.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{cert.email}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {cert.certificateType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle size={12} className="mr-1" />
                        Enviado
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{cert.sentAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Settings, component: DashboardTab },
    { id: 'participants', label: 'Participantes', icon: Users, component: ParticipantsTab },
    { id: 'templates', label: 'Templates', icon: FileText, component: TemplatesTab },
    { id: 'email', label: 'Email', icon: Mail, component: EmailConfigTab },
    { id: 'history', label: 'Histórico', icon: Download, component: HistoryTab }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || DashboardTab;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <nav className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={tab.icon}
                isActive={activeTab === tab.id}
                onClick={setActiveTab}
              />
            ))}
          </nav>
        </div>
        
        <ActiveComponent />
      </div>
    </div>
  );
};

export default CertificateManager;
