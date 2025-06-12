import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Key, Plus, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWeb3 } from "@/contexts/Web3Context";
import { generateKeyPair, generateDID, KeyPair } from "@/utils/cryptoUtils";
import { uploadToIPFS, createDIDDocument } from "@/utils/ipfsUtils";
import { useDIDContract } from "@/utils/contractUtils";

interface DIDCreatorProps {
  onDIDCreated: (didData: any) => void;
}

const DIDCreator = ({ onDIDCreated }: DIDCreatorProps) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    email: '',
    website: '',
    didMethod: 'did:ethr'
  });
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const { account, isConnected, connectWallet } = useWeb3();
  const { registerDID } = useDIDContract();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateRealKeyPair = async () => {
    try {
      const newKeyPair = await generateKeyPair();
      setKeyPair(newKeyPair);
      
      toast({
        title: "Real Key Pair Generated",
        description: "Cryptographic key pair generated using Web Crypto API",
      });
    } catch (error) {
      toast({
        title: "Key Generation Failed",
        description: "Failed to generate cryptographic keys",
        variant: "destructive"
      });
    }
  };

  const createRealDID = async () => {
    if (!formData.name || !keyPair) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields and generate a key pair",
        variant: "destructive"
      });
      return;
    }

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your MetaMask wallet first",
        variant: "destructive"
      });
      return;
    }

    setIsCreating(true);
    
    try {
      // Generate DID
      const did = generateDID(keyPair.publicKeyJwk, account || undefined);
      
      // Create DID Document
      const didDocument = createDIDDocument(did, keyPair.publicKeyJwk);
      
      // Upload to IPFS
      const ipfsHash = await uploadToIPFS(didDocument);
      
      // Register on blockchain
      await registerDID(did, ipfsHash);
      
      const didData = {
        did,
        name: formData.name,
        bio: formData.bio,
        email: formData.email,
        website: formData.website,
        publicKey: JSON.stringify(keyPair.publicKeyJwk),
        privateKey: JSON.stringify(keyPair.privateKeyJwk),
        verified: true,
        createdAt: new Date().toISOString(),
        ipfsHash,
        credentials: [],
        ethereumAddress: account
      };
      
      onDIDCreated(didData);
      
      toast({
        title: "DID Created Successfully!",
        description: `Real DID ${did} created and stored on IPFS/blockchain`,
      });
    } catch (error) {
      toast({
        title: "DID Creation Failed",
        description: "Failed to create and register DID",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="glass-effect border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient flex items-center gap-2">
          <Plus className="w-6 h-6" />
          Create Your Real DID Profile
        </CardTitle>
        <p className="text-muted-foreground">
          Using Web Crypto API, IPFS, and Ethereum blockchain
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!isConnected && (
          <Card className="border-yellow-500/20 bg-yellow-500/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-yellow-400">Connect Wallet Required</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your MetaMask wallet to create a real DID
                  </p>
                </div>
                <Button onClick={connectWallet} className="bg-primary hover:bg-primary/80">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect MetaMask
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isConnected && (
          <Card className="border-green-500/20 bg-green-500/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">Wallet Connected:</span>
                <code className="text-sm text-muted-foreground">
                  {account?.substring(0, 8)}...{account?.substring(account.length - 6)}
                </code>
              </div>
            </CardContent>
          </Card>
        )}

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
          <Label>Real Cryptographic Key Pair</Label>
          <div className="flex gap-2">
            <Input
              value={keyPair ? `${keyPair.publicKeyJwk.x?.substring(0, 20)}...` : ''}
              placeholder="Real public key will appear here..."
              readOnly
              className="bg-background/50 font-mono text-sm"
            />
            <Button variant="outline" onClick={generateRealKeyPair} className="shrink-0">
              <Key className="w-4 h-4 mr-2" />
              Generate Real Keys
            </Button>
          </div>
          {keyPair && (
            <p className="text-xs text-green-400">
              ✓ Real ECDSA P-256 key pair generated using Web Crypto API
            </p>
          )}
        </div>
        
        <Button 
          onClick={createRealDID} 
          className="w-full bg-primary hover:bg-primary/80 text-lg py-6"
          disabled={isCreating || !isConnected}
        >
          <Wallet className="w-5 h-5 mr-2" />
          {isCreating ? 'Creating Real DID...' : 'Create Real Decentralized Identity'}
        </Button>

        {isConnected && (
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Uses Web Crypto API for real key generation</p>
            <p>• Stores DID document on IPFS</p>
            <p>• Registers DID on Ethereum blockchain</p>
            <p>• Fully compliant with W3C DID standards</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DIDCreator;
