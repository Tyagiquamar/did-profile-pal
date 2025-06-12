
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Key, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DIDCreatorProps {
  onDIDCreated: (didData: any) => void;
}

const DIDCreator = ({ onDIDCreated }: DIDCreatorProps) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    email: '',
    website: '',
    didMethod: 'did:ethr',
    publicKey: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateKeyPair = () => {
    // Simulate key generation
    const mockPublicKey = `0x${Math.random().toString(16).substr(2, 40)}`;
    setFormData(prev => ({ ...prev, publicKey: mockPublicKey }));
    toast({
      title: "Key Pair Generated",
      description: "New cryptographic key pair has been generated for your DID",
    });
  };

  const createDID = async () => {
    if (!formData.name || !formData.publicKey) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields and generate a key pair",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    
    // Simulate DID creation
    setTimeout(() => {
      const didIdentifier = `${formData.didMethod}:${Math.random().toString(16).substr(2, 40)}`;
      const didData = {
        did: didIdentifier,
        name: formData.name,
        bio: formData.bio,
        email: formData.email,
        website: formData.website,
        publicKey: formData.publicKey,
        verified: false,
        createdAt: new Date().toISOString(),
        credentials: []
      };
      
      onDIDCreated(didData);
      setIsCreating(false);
      
      toast({
        title: "DID Created Successfully!",
        description: `Your decentralized identity ${didIdentifier} has been created`,
      });
    }, 2000);
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient flex items-center gap-2">
          <Plus className="w-6 h-6" />
          Create Your DID Profile
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="bg-background/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              className="bg-background/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Tell us about yourself..."
            className="bg-background/50"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://yourwebsite.com"
              className="bg-background/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="didMethod">DID Method</Label>
            <Select value={formData.didMethod} onValueChange={(value) => handleInputChange('didMethod', value)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="did:ethr">did:ethr (Ethereum)</SelectItem>
                <SelectItem value="did:key">did:key (Cryptographic)</SelectItem>
                <SelectItem value="did:web">did:web (Web-based)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <Label>Cryptographic Key Pair</Label>
          <div className="flex gap-2">
            <Input
              value={formData.publicKey}
              placeholder="Public key will appear here..."
              readOnly
              className="bg-background/50 font-mono text-sm"
            />
            <Button variant="outline" onClick={generateKeyPair} className="shrink-0">
              <Key className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>
        
        <Button 
          onClick={createDID} 
          className="w-full bg-primary hover:bg-primary/80 text-lg py-6"
          disabled={isCreating}
        >
          <Wallet className="w-5 h-5 mr-2" />
          {isCreating ? 'Creating DID...' : 'Create Decentralized Identity'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DIDCreator;
