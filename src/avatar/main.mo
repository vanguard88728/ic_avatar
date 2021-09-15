import Trie "mo:base/Trie";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Principal "mo:base/Principal";

actor Avatar {
    type Bio = {
        givenName: ?Text;
        familyName: ?Text;
        name: ?Text;
        displayName: ?Text;
        location: ?Text;
        about: ?Text;
    };

    type Profile = {
        bio: Bio;
        id: Principal;
    }

    type ProfileUpdate = {
        bio: Bio;
    }

    type Error = {
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
    }

    // Application state
    stable var profiles : Trie.Trie<Principal, Profile> = Trie.empty();

    // Application interface

    // Create a profile
    public shared(msg) func create(profile: ProfileUpdate) : async Result.Result<(), Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Associate user profile with their principal
        let userProfile: Profile = {
            bio = profile.bio;
            id = callerId;
        };

        let (newProfiles, existing) = Trie.put(
            profiles,           // Target trie
            key(callerId),      // Key
            Principal.equal,    // Equality checker
            userProfile
        );

        // If there is an original value, do not update
        switch(existing) {
            // If there are no matches, update profiles
            case null {
                profiles := newProfiles;
                #ok(());
            };
            // Matches pattern of type - opt Profile
            case (? v) {
                #err(#AlreadyExists);
            }
        }
    };

    // Read profile 
    public shared(msg) func read() : async Result.Result<Profile, Error> {
        // Get caller principal
        let callerId = msg.caller;
        
        let result = Trie.find(
            profiles,           // Target Trie
            key(callerId),      // Key
            Principal.equal     // Equality checker
        );
        return Result.fromOption(result, #NotFound);
    };

    // Update profile
    public shared(msg) func update(profile: Profile) : async Result.Result<(), Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Associate user profile with their principal
        let userProfile: Profile = {
            bio = profile.bio;
            id = callerId;
        };

        let result = Trie.find(
            profiles,           // Target Trie
            key(callerId),      // Key
            Principal.equal     // Equality checker
        );

        switch (result) {
            // Do not allow updates to profiles that haven't been created yet
            case null {
                #err(#NotFound);
            };
            case (? v) {
                profiles := Trie.replace(
                    profiles,           // Target trie
                    key(callerId),      // Key
                    Principal.equal,    // Equality checker
                    ?userProfile
                ).0;
                #ok(());
            }
        }
    }

    // Delete profile
    public shared(msg) func delete(profileId: Nat) : async Result.Result<(), Error> {
        // Get caller principal
        let callerId = msg.caller;

        let result = Trie.find(
            profiles,           // Target Trie
            key(callerId),      // Key
            Principal.equal     // Equality checker
        );

        switch (result) {
            // Do not try to delete a profile that hasen't been created yet
            case null {
                #err(#NotFound);
            };
            case (? v) {
                profiles := Trie.replace(
                    profiles,           // Target trie
                    key(callerId),      // Key
                    Principal.equal,    // Equality checker
                    null
                ).0;
                #ok(());
            }
        }
    }

    private func key(x: Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    }
};
