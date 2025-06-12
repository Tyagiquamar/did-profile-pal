
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Shield, Key, Users, Globe } from "lucide-react";
import DIDProfileHeader from "@/components/DIDProfileHeader";
import DIDCreator from "@/components/DIDCreator";
import CredentialCard from "@/components/CredentialCard";
import CredentialViewer from "@/components/CredentialViewer";
import { useToast } from "@/hooks/use-toast";

interface DIDProfile {
  did: string;
  name: string;
  bio?: string;
  email?: string;
  website?: string;
  avatar?: string;
  verified: boolean;
  publicKey: string;
  createdAt: string;
  credentials: any[];
}

const Index = () => {
  const [currentProfile, setCurrentProfile] = useState<DIDProfile | null>(null);
  const [selectedCredential, setSelectedCredential] = useState<any>(null);
  const [showCreator, setShowCreator] = useState(false);
  const { toast } = useToast();

  // Mock credentials for demonstration
  const mockCredentials = [
    {
      id: '1',
      type: 'Education Certificate',
      issuer: 'MIT University',
      issuedDate: '2023-06-15',
      expiryDate: '2028-06-15',
      status: 'verified' as const,
      data: {
        degree: 'Bachelor of Computer Science',
        gpa: '3.8',
        graduationDate: '2023-06-15',
        honors: 'Magna Cum Laude'
      }
    },
    {
      id: '2',
      type: 'Professional License',
      issuer: 'State Board',
      issuedDate: '2023-08-01',
      status: 'verified' as const,
      data: {
        licenseNumber: 'PL-2023-001',
        profession: 'Software Engineer',
        level: 'Senior'
      }
    }
  ];

  const handleDIDCreated = (didData: any) => {
    setCurrentProfile({
      ...didData,
      credentials: mockCredentials
    });
    setShowCreator(false);
  };

  const handleViewCredential = (credential: any) => {
    setSelectedCredential(credential);
  };

  const handleDownloadCredential = (credential: any) => {
    const dataStr = JSON.stringify(credential, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `credential-${credential.id}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Credential Downloaded",
      description: "Your verifiable credential has been saved as a JSON file",
    });
  };

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing feature coming soon!",
    });
  };

  if (showCreator) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowCreator(false)}
              className="mb-4"
            >
              ← Back to Dashboard
            </Button>
          </div>
          <DIDCreator onDIDCreated={handleDIDCreated} />
        </div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-gradient mb-4">
              DID Profile Manager
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create and manage your decentralized identity with verifiable credentials 
              on the blockchain. Take control of your digital identity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass-effect border-primary/20 hover:neon-glow transition-all duration-300">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-2 text-primary animate-float" />
                <CardTitle className="text-lg">Secure Identity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Your identity is secured by cryptographic keys and stored on decentralized networks.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-effect border-primary/20 hover:neon-glow transition-all duration-300">
              <CardHeader className="text-center">
                <Key className="w-12 h-12 mx-auto mb-2 text-primary animate-float" />
                <CardTitle className="text-lg">Self-Sovereign</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  You own and control your data without relying on centralized authorities.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-effect border-primary/20 hover:neon-glow transition-all duration-300">
              <CardHeader className="text-center">
                <Globe className="w-12 h-12 mx-auto mb-2 text-primary animate-float" />
                <CardTitle className="text-lg">Interoperable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use your DID across different platforms and services seamlessly.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Button 
              onClick={() => setShowCreator(true)}
              className="bg-primary hover:bg-primary/80 text-lg px-8 py-6 neon-glow"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your DID Profile
            </Button>
            <p className="text-sm text-muted-foreground">
              Get started in minutes • No KYC required • Fully decentralized
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <DIDProfileHeader
          did={currentProfile.did}
          name={currentProfile.name}
          avatar={currentProfile.avatar}
          verified={currentProfile.verified}
          credentialsCount={currentProfile.credentials.length}
          onEditProfile={handleEditProfile}
        />
        
        <Tabs defaultValue="credentials" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-effect">
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="profile">Profile Data</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="credentials" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gradient">Verifiable Credentials</h2>
              <Button className="bg-primary hover:bg-primary/80">
                <Plus className="w-4 h-4 mr-2" />
                Add Credential
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProfile.credentials.map((credential) => (
                <CredentialCard
                  key={credential.id}
                  credential={credential}
                  onView={handleViewCredential}
                  onDownload={handleDownloadCredential}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-6">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-gradient">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">DID</label>
                    <p className="font-mono text-sm bg-muted/50 p-2 rounded">{currentProfile.did}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p>{currentProfile.name}</p>
                  </div>
                  {currentProfile.email && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p>{currentProfile.email}</p>
                    </div>
                  )}
                  {currentProfile.website && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Website</label>
                      <p>{currentProfile.website}</p>
                    </div>
                  )}
                </div>
                {currentProfile.bio && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Bio</label>
                    <p className="text-muted-foreground">{currentProfile.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-effect border-primary/20">
              <CardHeader>
                <CardTitle className="text-gradient">DID Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <div>
                    <h3 className="font-medium">Export DID Document</h3>
                    <p className="text-sm text-muted-foreground">Download your complete DID document</p>
                  </div>
                  <Button variant="outline">Export</Button>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <h3 className="font-medium">Backup Keys</h3>
                    <p className="text-sm text-muted-foreground">Securely backup your cryptographic keys</p>
                  </div>
                  <Button variant="outline">Backup</Button>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <h3 className="font-medium">Revoke DID</h3>
                    <p className="text-sm text-muted-foreground">Permanently revoke this decentralized identity</p>
                  </div>
                  <Button variant="destructive">Revoke</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {selectedCredential && (
          <CredentialViewer
            credential={selectedCredential}
            onClose={() => setSelectedCredential(null)}
            onDownload={handleDownloadCredential}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
