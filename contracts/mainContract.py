import smartpy as sp

class FundChain(sp.Contract):
    def __init__(self):
        self.init(
        users = sp.map(
                            #uuid
                            tkey=sp.TString,
                            tvalue=sp.TRecord(
                                    uuid=sp.TString,
                                    datetime=sp.TTimestamp,
                                    donated_mutez=sp.TMutez,
                                    email = sp.TString,
                                    posts= sp.TList(sp.TString),
                                    org_xp = sp.TInt,
                                    user_xp = sp.TInt,
                                )
                            ),
        transactions=sp.map(
                                #uuid or puid
                                tkey=sp.TString,
                                tvalue=sp.TList(
                                    sp.TRecord(
                                        transid = sp.TString,
                                        type = sp.TNat,
                                        from_uuid=sp.TString,
                                        from_address=sp.TAddress,
                                        to_puid=sp.TString,
                                        to_address=sp.TAddress,
                                        amount = sp.TMutez,
                                        comment=sp.TString,
                                        timestamp=sp.TTimestamp,
                                        downvotes = sp.TNat,
                                        claimable = sp.TNat
                                        # verified = sp.TBool,
                                    )
                                )
                            ),
        posts=sp.map(
                    # puid
                    tkey=sp.TString,
                    tvalue=sp.TRecord(
                        owner_uuid = sp.TString,
                        name = sp.TString,
                        institution = sp.TString,
                        description = sp.TString,
                        post_type = sp.TString,
                        goal=sp.TMutez,
                        timestamp=sp.TTimestamp,
                        received_mutez=sp.TMutez,
                        goal_reached=sp.TBool,
                        address = sp.TAddress,
                        pictures = sp.TList(sp.TString),
                        deadline = sp.TTimestamp,
                        locked_fund = sp.TMutez,
                        upvotes = sp.TList(sp.TString),
                        downvotes =sp.TList(sp.TString),
                        # supports=sp.TNat,
                        # reports=sp.TNat,
                        # verified=sp.TBool
                    )
                ),
        total_fund=sp.mutez(0),
        total_donors = sp.nat(0),
        total_goals_reached=sp.nat(0),
        total_fundings=sp.nat(0),
        locked_funds=sp.mutez(0)
        )
    '''
    Setters
    '''

    @sp.entry_point
    def add_user(self,params):
        sp.set_type(params.uuid,sp.TString)
        sp.set_type(params.email,sp.TString)
        sp.verify(self.data.users.contains(params.uuid)==False)
        self.data.users[params.uuid]=sp.record(
            uuid=params.uuid,
            datetime=sp.now,
            donated_mutez=sp.mutez(0),
            email = params.email,
            posts= sp.list([]),
            org_xp = sp.int(0),
            user_xp = sp.int(0)
        )
        self.data.transactions[params.uuid] = sp.list([])

    @sp.entry_point
    def add_transaction1(self,params):
    #   params = from_uuid,from_address,to_puid,amount,comment
        sp.set_type(params.from_uuid,sp.TString)
        sp.set_type(params.from_address,sp.TAddress)
        sp.set_type(params.to_puid,sp.TString)
        sp.set_type(params.amount,sp.TMutez)
        sp.set_type(params.comment,sp.TString)
        sp.set_type(params.transid,sp.TString)
        sp.verify(self.data.users.contains(params.from_uuid) == True)
        sp.verify(self.data.posts.contains(params.to_puid) == True)
        sp.verify(self.data.posts[params.to_puid].goal_reached == False)
        sp.verify(self.data.posts[params.to_puid].owner_uuid != params.from_uuid)
        sp.send(self.data.posts[params.to_puid].address, params.amount, message = "HELLO")
        self.data.transactions[params.from_uuid].push(sp.record(
            transid = params.transid,
            type = 1,
            from_uuid=params.from_uuid,
            from_address=params.from_address,
            to_puid=params.to_puid,
            to_address= self.data.posts[params.to_puid].address,
            amount = params.amount, 
            comment= params.comment,
            timestamp= sp.now,
            downvotes = 0,
            claimable = 0,
            # verified = True,
        ))
        self.data.transactions[params.to_puid].push(sp.record(
            transid = params.transid,
            type = 1,
            from_uuid=params.from_uuid,
            from_address=params.from_address,
            to_puid=params.to_puid,
            to_address=self.data.posts[params.to_puid].address,
            amount = params.amount,
            comment= params.comment,
            timestamp=sp.now,
            downvotes = 0,
            claimable = 0,
            # verified = True,
        ))
        # sp.send(self.data.posts[params.to_puid].address, params.amount, message = None)
        sp.if self.data.users[params.from_uuid].donated_mutez == sp.mutez(0):
            self.data.total_donors += 1

        self.data.posts[params.to_puid].received_mutez += params.amount
        self.data.users[params.from_uuid].donated_mutez += params.amount
        self.data.total_fund += params.amount
        self.data.total_fundings += 1
        self.data.users[params.from_uuid].user_xp = sp.to_int(sp.fst(sp.ediv(self.data.users[params.from_uuid].donated_mutez,sp.mutez(100000)).open_some()))

        sp.if self.data.posts[params.to_puid].received_mutez > self.data.posts[params.to_puid].goal:
            self.data.posts[params.to_puid].goal_reached = True
            sp.if self.data.posts[params.to_puid].goal_reached == False :
                self.data.total_goals_reached += 1
            self.data.users[self.data.posts[params.to_puid].owner_uuid].org_xp = sp.to_int(sp.fst(sp.ediv(self.data.posts[params.to_puid].received_mutez,sp.mutez(10000000)).open_some()))

    @sp.entry_point
    def add_transaction2(self,params):
        sp.set_type(params.from_uuid,sp.TString)
        sp.set_type(params.from_address,sp.TAddress)
        sp.set_type(params.to_puid,sp.TString)
        sp.set_type(params.amount,sp.TMutez)
        sp.set_type(params.comment,sp.TString)
        sp.set_type(params.downvotes,sp.TNat)
        sp.set_type(params.transid,sp.TString)
        sp.verify(self.data.users.contains(params.from_uuid) == True)
        sp.verify(self.data.posts.contains(params.to_puid) == True)
        sp.verify(self.data.posts[params.to_puid].goal_reached == False)
        sp.verify(self.data.posts[params.to_puid].owner_uuid != params.from_uuid)
        self.data.transactions[params.from_uuid].push(sp.record(
            transid = params.transid,
            type = 2,
            from_uuid=params.from_uuid,
            from_address=params.from_address,
            to_puid=params.to_puid,
            to_address= self.data.posts[params.to_puid].address,
            amount = params.amount, 
            comment= params.comment,
            timestamp= sp.now,
            downvotes = params.downvotes,
            claimable = 1,
            # verified = False,
        ))
        self.data.transactions[params.to_puid].push(sp.record(
            transid = params.transid,
            type = 2,
            from_uuid=params.from_uuid,
            from_address=params.from_address,
            to_puid=params.to_puid,
            to_address=self.data.posts[params.to_puid].address,
            amount = params.amount,
            comment= params.comment,
            timestamp=sp.now,
            downvotes = params.downvotes,
            claimable = 1,
            # verified = False,
        ))
        sp.if self.data.users[params.from_uuid].donated_mutez == sp.mutez(0):
            self.data.total_donors += 1

        self.data.posts[params.to_puid].locked_fund += params.amount
        # self.data.total_fund += params.amount
        self.data.total_fundings += 1
        self.data.locked_funds += params.amount
        
    @sp.entry_point
    def add_post(self,params):
        sp.verify(self.data.posts.contains(params.puid) == False)
        sp.set_type(params.name,sp.TString)
        sp.set_type(params.description,sp.TString)
        sp.set_type(params.institution,sp.TString)
        sp.set_type(params.post_type,sp.TString)
        sp.set_type(params.uuid,sp.TString)
        sp.set_type(params.puid,sp.TString)
        sp.set_type(params.goal,sp.TMutez)
        sp.set_type(params.deadline,sp.TTimestamp)
        sp.set_type(params.address,sp.TAddress)
        sp.set_type(params.pictures,sp.TList(sp.TString))

        self.data.posts[params.puid]=sp.record(
            owner_uuid = params.uuid,
            name = params.name,
            institution = params.institution,
            description = params.description,
            post_type = params.post_type,
            goal=params.goal,
            timestamp=sp.now,
            received_mutez=sp.mutez(0),
            goal_reached=sp.bool(False),
            address = params.address,
            pictures = params.pictures,
            deadline = params.deadline,
            locked_fund = sp.mutez(0),
            upvotes = sp.list([]),
            downvotes = sp.list([]),
        )
        self.data.transactions[params.puid] = sp.list([])
        self.data.users[params.uuid].posts.push(params.puid)

    @sp.entry_point
    def support(self,params):
        sp.set_type(params.puid,sp.TString)
        sp.set_type(params.uuid,sp.TString)
        sp.verify(self.data.users.contains(params.uuid) == True)
        sp.verify(self.data.posts.contains(params.puid) == True)
        self.data.posts[params.puid].upvotes.push(params.uuid)
        self.data.users[self.data.posts[params.puid].owner_uuid].org_xp += 5

    @sp.entry_point
    def report(self,params):
        sp.set_type(params.puid,sp.TString)
        sp.set_type(params.uuid,sp.TString)
        sp.verify(self.data.users.contains(params.uuid) == True)
        sp.verify(self.data.posts.contains(params.puid) == True)
        self.data.posts[params.puid].downvotes.push(params.uuid)
        self.data.users[self.data.posts[params.puid].owner_uuid].org_xp -= 5
    

    @sp.entry_point
    def claim(self,params):
        sp.set_type(params.uuid,sp.TString)
        sp.set_type(params.puid,sp.TString)
        sp.set_type(params.transid,sp.TString)
        sp.for i in self.data.transactions[params.puid]:
            sp.if i.transid == params.transid:
                sp.verify(params.uuid == self.data.posts[params.puid].owner_uuid)
                sp.verify(self.data.posts[params.puid].goal_reached == False)
                sp.if self.data.posts[params.puid].deadline <= sp.now:
                    sp.if sp.len(self.data.posts[params.puid].downvotes) < i.downvotes:
                        sp.if i.claimable == 1:
                            sp.send(self.data.posts[params.puid].address, i.amount, message = "HELLO")
                            self.data.locked_funds -= i.amount
                            self.data.posts[params.puid].received_mutez += i.amount
                            self.data.total_fund += i.amount
                            self.data.users[i.from_uuid].donated_mutez += i.amount
                            self.data.users[i.from_uuid].user_xp = sp.to_int(sp.fst(sp.ediv(self.data.users[i.from_uuid].donated_mutez,sp.mutez(200000)).open_some()))
                            i.claimable = 0
                            sp.if self.data.posts[i.to_puid].received_mutez > self.data.posts[i.to_puid].goal:
                                self.data.posts[i.to_puid].goal_reached = True
                                sp.if self.data.posts[i.to_puid].goal_reached == False :
                                    self.data.total_goals_reached += 1
                                self.data.users[self.data.posts[params.puid].owner_uuid].org_xp = sp.to_int(sp.fst(sp.ediv(self.data.posts[params.puid].received_mutez,sp.mutez(1000000)).open_some()))
                            sp.trace("Claimed Succefully")
                

    @sp.entry_point
    def reclaim(self,params):
        sp.set_type(params.uuid,sp.TString)
        sp.set_type(params.puid,sp.TString)
        sp.set_type(params.transid,sp.TString)
        sp.set_type(params.address,sp.TAddress)
        sp.for i in self.data.transactions[params.puid]:
            sp.if i.transid == params.transid:
                sp.verify(params.uuid == i.from_uuid)
                sp.if self.data.posts[params.puid].deadline <= sp.now:
                    sp.if sp.len(self.data.posts[params.puid].downvotes) >= i.downvotes:
                        sp.if i.claimable == 1:
                            sp.send(params.address, sp.split_tokens(i.amount, 8, 10), message = "HELLO")
                            self.data.locked_funds -= sp.split_tokens(i.amount, 8, 10)
                            self.data.posts[params.puid].locked_fund -= sp.split_tokens(i.amount, 8, 10)
                            i.claimable = 0
                            sp.trace("Reclaimed Succefully")
