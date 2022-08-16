@sp.add_test(name = "fc testing")
def test():
    scenario = sp.test_scenario()

    fc = FundChain()
    fc.set_initial_balance(sp.mutez(1000000))
    scenario += fc
    scenario += fc.add_user(uuid = "u00001",email = "user1@gmail.com")
    scenario += fc.add_user(uuid = "u00002",email = "user2@gmail.com")
    scenario += fc.add_user(uuid = "u00003",email = "user3@gmail.com")
    scenario += fc.add_post(uuid = "u00002",puid = "p00001",name="ASD",description="ASD",institution="nsd",post_type="Education",goal = sp.mutez(100000),address=sp.address("tz100002"),pictures = ["12123233","12312414"],deadline =sp.timestamp(1631039400))
    scenario += fc.add_transaction2(transid="t00001",from_uuid="u00001",from_address=sp.address("tz100001"),to_puid="p00001",amount = sp.mutez(1000),comment="Nuv superrraa",downvotes=10)
    scenario += fc.reclaim(uuid ="u00001",address=sp.address("tz1234343"), puid = "p00001",transid = "t00001")
    scenario += fc.claim(uuid="u00002" ,puid = "p00001",transid = "t00001")
    scenario += fc.add_transaction1(transid="t00001",from_uuid="u00001",from_address=sp.address("tz100001"),to_puid="p00001",amount = sp.mutez(50000),comment="Nuv superrraa")
    scenario += fc.add_transaction1(transid="t00001",from_uuid="u00001",from_address=sp.address("tz100001"),to_puid="p00001",amount = sp.mutez(50000),comment="Nuv superrraa")